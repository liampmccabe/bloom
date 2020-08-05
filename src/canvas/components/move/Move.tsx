import React from "react"

import zoomStyles from "./move.module.css"

interface IMove {
	x: number
	y: number
	onMoveUp(): void
	onMoveDown(): void
	onMoveLeft(): void
	onMoveRight(): void
}

export function Move({ onMoveUp, onMoveDown, onMoveLeft, onMoveRight }: IMove) {
	return (
		<div className={zoomStyles.container}>
			<div onClick={onMoveUp}>Up</div>
			<div onClick={onMoveDown}>Down</div>
			<div onClick={onMoveLeft}>Left</div>
			<div onClick={onMoveRight}>Right</div>
		</div>
	)
}
