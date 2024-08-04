import { useState } from "react";

/**
 * Custom hook to manage form submissions incorporating asynchronous operations.
 *
 * @param {() => Promise<void>} handleSubmitLogic - A callback function containing the logic to be executed upon form submission.
 * @returns {object} An object containing:
 *  - `isSubmitted`: Boolean indicating whether the form has been submitted.
 *  - `error`: String or null capturing any error message that occurs during form submission.
 *  - `handleSubmit`: Function to be invoked on form submission, handling event prevention, logic execution, and state updates.
 *  - `setIsSubmitted`: Function to update the submission state.
 *  - `isLoading`: Boolean indicating if the submission logic is currently being executed.
 */
const useFormSubmission = (handleSubmitLogic: () => Promise<void>) => {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setError(null);

		try {
			setIsLoading(true);
			await handleSubmitLogic();
		} catch (err: any) {
			setError(err.message || "An error occurred");
		} finally {
			setIsSubmitted(true);
			setIsLoading(false);
		}
	};

	return { isSubmitted, error, handleSubmit, setIsSubmitted, isLoading };
};

export default useFormSubmission;
