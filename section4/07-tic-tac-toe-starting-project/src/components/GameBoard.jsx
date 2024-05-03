import { useState } from "react";

function GameBoard({ onSelectSquare, gameBoard }) {
	return (
		<ol id="game-board">
			{gameBoard.map((row, row_i) => (
				<li key={row_i}>
					<ol>
						{row.map((playerSymbol, playerSymbol_i) => (
							<li key={playerSymbol_i}>
								<button onClick={() => onSelectSquare(row_i, playerSymbol_i)} disabled={playerSymbol !== null}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}

export default GameBoard;
