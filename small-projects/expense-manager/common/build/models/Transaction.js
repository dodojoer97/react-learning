"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, userId, amount, date, categoryId, type, description) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.date = date;
        this.categoryId = categoryId;
        this.type = type;
        this.description = description;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map