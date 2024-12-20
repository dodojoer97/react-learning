import { CategoryType } from "./Category";
export type Frequency = "daily" | "weekly" | "monthly" | "yearly";
export type IRecurringTransaction = {
    isRecurring: boolean;
    frequency?: Frequency;
    endDate?: string;
};
export interface ITransaction {
    id: string;
    userId: string;
    amount: number;
    date: string;
    categoryId: string;
    type: CategoryType;
    createdAt: string;
    description?: string;
    status: "planned" | "completed";
    recurring?: IRecurringTransaction | null;
}
export type MandatoryTransactionFields = keyof Omit<ITransaction, "description" | "recurring">;
export declare class Transaction implements ITransaction {
    id: string;
    userId: string;
    amount: number;
    date: string;
    categoryId: string;
    type: CategoryType;
    createdAt: string;
    status: "planned" | "completed";
    description?: string;
    recurring?: IRecurringTransaction | null;
    constructor(transaction: ITransaction);
}
//# sourceMappingURL=Transaction.d.ts.map