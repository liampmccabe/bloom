import React, { useState } from "react"

import toolsStyles from "./tools.module.css"

interface ITools {
	onMove(): void
	onHand(): void
	onText(): void
	onDraw(): void
}

export function Tools({ onMove, onHand, onText, onDraw }: ITools) {
	return (
		<div className={toolsStyles.container}>
			<div className={toolsStyles.bar}>
				<div onClick={onMove}>Move</div>
				<div onClick={onHand}>Hand</div>
				<div onClick={onText}>Text</div>
				<div onClick={onDraw}>Draw</div>
			</div>
		</div>
	)
}
