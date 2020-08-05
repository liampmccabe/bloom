import React from "react"

import undoredoStyles from "./undoredo.module.css"

interface IUndoRedo {
	onUndo(): void
	onRedo(): void
}

export function UndoRedo({ onUndo, onRedo }: IUndoRedo) {
	return (
		<div className={undoredoStyles.container}>
			<div onClick={onUndo}>Undo</div>
			<div onClick={onRedo}>Redo</div>
		</div>
	)
}
