import { CategoryType } from "./Category";
export interface ITransaction {
    id: string;
    userId: string;
    amount: number;
    date: Date;
    categoryId: string;
    type: CategoryType;
    description?: string;
}
export type MandatoryTransactionFields = keyof Omit<ITransaction, "description">;
export declare class Transaction implements ITransaction {
    id: string;
    userId: string;
    amount: number;
    date: Date;
    categoryId: string;
    type: CategoryType;
    description?: string | undefined;
    constructor(id: string, userId: string, amount: number, date: Date, categoryId: string, type: CategoryType, description?: string | undefined);
}
//# sourceMappingURL=Transaction.d.ts.map