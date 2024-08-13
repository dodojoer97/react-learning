import { Record } from "@common";
import { ICreateRecordDTO } from "./CreateRecord.d";

class CreateRecordDTO implements ICreateRecordDTO {
	constructor(public record: Record) {}
}

export default CreateRecordDTO;
