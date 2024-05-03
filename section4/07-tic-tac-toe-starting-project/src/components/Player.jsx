import { useState } from "react"

function Player({ initialName, symbol }) {
	const [playerName, setPlayerName] = useState(initialName)
	const [isEditing, setIsEditing] = useState(false)

	function handleEdit() {
		// When updating the state based on old state a function should be passsed, not the inverted value
		// React schedules the updaing of state
		setIsEditing((editing) => !editing)
	}

	function handleChange(event) {
		setPlayerName(event.target.value)
	}

	let editablePlayerName = <span className='player-name'>{playerName}</span>
	let btnCaption = "Edit"

	if (isEditing) {
		editablePlayerName = (
			<input
				type='text'
				required
				value={playerName}
				onChange={handleChange}
			/>
		)
		btnCaption = "Save"
	}

	return (
		<li>
			<span className='player'>
				{editablePlayerName}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEdit}>{btnCaption}</button>
		</li>
	)
}

export default Player
