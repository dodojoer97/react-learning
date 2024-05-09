import { useState } from "react";

// A single todo item
export default function ToDoItem({ taskName, id }) {
	return <li>{taskName}</li>;
}
