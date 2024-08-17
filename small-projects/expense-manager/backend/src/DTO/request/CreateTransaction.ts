import { Transaction } from "@common";
import { ICreateTransactionDTO } from "./CreateTransaction.d";

class CreateTransactionDTO implements ICreateTransactionDTO {
	constructor(public transaction: Transaction) {}
}

export default CreateTransactionDTO;
