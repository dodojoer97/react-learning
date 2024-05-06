// NEed to use forwardRef to forward a ref from one component to
import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ({ result, targetTime, open }, ref) {
	const dialog = useRef();

	//  Exposes the open method to the component passing the ref
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			},
		};
	});

	return (
		<dialog ref={dialog} className="result-modal" open={open}>
			<h2>You {result} </h2>
			<p>
				The tarte time was <strong>{targetTime} seconds</strong>
			</p>
			<p>
				You stopped the timer with <strong>X seconds left.</strong>
			</p>
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>
	);
});
export default ResultModal;
