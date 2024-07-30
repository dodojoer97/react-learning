"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenseService_1 = __importDefault(require("../services/ExpenseService"));
class ExpenseController {
    addExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = req.body;
                yield ExpenseService_1.default.createExpense(expense);
                res.status(201).send(expense);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getExpensesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const expenses = yield ExpenseService_1.default.fetchExpensesByUser(userId);
                res.status(200).send(expenses);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.default = new ExpenseController();
