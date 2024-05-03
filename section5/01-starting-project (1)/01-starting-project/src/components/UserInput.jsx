import { useState } from "react";

function UserInput({ onChange, userInput }) {
	return (
		<form id="user-input">
			<div className="input-group">
				<div>
					<label>INITIAL INVESTEMENT</label>
					<input type="number" value={userInput.initialInvestment} required onChange={(event) => onChange("initialInvestment", event.target.value)} />
				</div>
				<div>
					<label>ANNUAL INVESTEMENT</label>
					<input type="number" value={userInput.annualInvestment} required onChange={(event) => onChange("annualInvestment", event.target.value)} />
				</div>
			</div>
			<div className="input-group">
				<div>
					<label>EXPECTED RETURN</label>
					<input type="number" value={userInput.expectedReturn} required onChange={(event) => onChange("expectedReturn", event.target.value)} />
				</div>
				<div>
					<label>DURATION</label>
					<input type="number" value={userInput.duration} required onChange={(event) => onChange("duration", event.target.value)} />
				</div>
			</div>
		</form>
	);
}

export default UserInput;
