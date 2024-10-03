const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Helper function to calculate the next occurrence based on frequency
function getNextOccurrence(date, frequency) {
	const currentDate = new Date(date);
	switch (frequency) {
		case "daily":
			currentDate.setDate(currentDate.getDate() + 1);
			break;
		case "weekly":
			currentDate.setDate(currentDate.getDate() + 7);
			break;
		case "monthly":
			currentDate.setMonth(currentDate.getMonth() + 1);
			break;
		case "yearly":
			currentDate.setFullYear(currentDate.getFullYear() + 1);
			break;
		default:
			throw new Error("Invalid frequency");
	}
	return currentDate.toISOString().split("T")[0]; // Return in 'YYYY-MM-DD' format
}

// Scheduled function to process recurring transactions using the onSchedule method
exports.scheduledRecurringTransactions = onSchedule("every 24 hours", async (context) => {
	const currentDate = new Date();
	const plannedTransactionsRef = db.collection("records");

	try {
		// Query for all recurring planned transactions
		const querySnapshot = await plannedTransactionsRef
			.where("recurring.isRecurring", "==", true)
			.get();

		const batch = db.batch();
		querySnapshot.forEach((doc) => {
			const transaction = doc.data();
			const transactionDate = new Date(transaction.date);
			const endDate = new Date(transaction.recurring.endDate);

			console.log("transactionDate: ", transactionDate);
			console.log("currentDate: ", currentDate);

			// Check if the transaction date has passed
			if (transactionDate <= currentDate) {
				// Calculate the next occurrence based on the recurrence frequency
				const nextDate = getNextOccurrence(
					transaction.date,
					transaction.recurring.frequency
				);

				console.log("nextDate: ", nextDate);

				// If the nextDate is beyond the end date, mark this transaction as completed
				if (new Date(nextDate) > endDate) {
					console.log("End date reached, marking transaction as completed");
					batch.update(plannedTransactionsRef.doc(doc.id), {
						status: "completed",
						date: currentDate.toISOString(), // Mark the transaction as completed
					});
				} else {
					// Mark the current transaction as completed
					batch.update(plannedTransactionsRef.doc(doc.id), {
						status: "completed",
						date: currentDate.toISOString(), // Mark as completed
					});

					// Create a new planned transaction for the next recurrence
					const newTransactionRef = plannedTransactionsRef.doc();
					batch.set(newTransactionRef, {
						...transaction,
						date: nextDate, // Set the new recurrence date
						status: "planned",
						createdAt: new Date().toISOString(),
					});
				}
			}
		});

		await batch.commit();
		console.log("Recurring transactions processed successfully.");
	} catch (error) {
		console.error("Error processing recurring transactions: ", error);
	}
});
