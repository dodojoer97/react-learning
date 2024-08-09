export interface IExpense {
    id: string;
    userId: string;
    categoryId: string;
    amount: number;
    description: string;
    date: Date;
}
export declare class Expense implements IExpense {
    id: string;
    userId: string;
    categoryId: string;
    amount: number;
    description: string;
    date: Date;
    constructor(id: string, userId: string, categoryId: string, amount: number, description: string, date: Date);
}
//# sourceMappingURL=Expense.d.ts.map