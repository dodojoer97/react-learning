import { useEffect, useState } from "react";

// Components
import ProgressBar from "./ProgressBar";
const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onConfirm();
		}, TIMER);

		// Cleanup, will be executed bright before the useEffect is called or right before the componet is dismounted
		return () => {
			clearTimeout(timer);
		};
		// Using functions as depencecies is dangerous, cause thery are objects and will be re created when the component is re executed
	}, [onConfirm]);

	return (
		<div id="delete-confirmation">
			<h2>Are you sure?</h2>
			<p>Do you really want to remove this place?</p>
			<div id="confirmation-actions">
				<button onClick={onCancel} className="button-text">
					No
				</button>
				<button onClick={onConfirm} className="button">
					Yes
				</button>
			</div>
			<ProgressBar timer={TIMER} />
		</div>
	);
}
