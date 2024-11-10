"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
// Transaction class implementation with object in constructor
class Transaction {
    constructor(transaction) {
        this.id = transaction.id;
        this.userId = transaction.userId;
        this.amount = transaction.amount;
        this.date = transaction.date;
        this.categoryId = transaction.categoryId;
        this.type = transaction.type;
        this.createdAt = transaction.createdAt || new Date().toISOString(); // Default to the current timestamp if not provided
        this.status = transaction.status || "completed"; // Default status to "completed" if not provided
        this.description = transaction.description;
        this.recurring = transaction.recurring;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map