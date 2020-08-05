import React, { useState } from "react"

import toolsStyles from "./tools.module.css"

interface ITools {
	selected: string
	onMove(): void
	onHand(): void
	onText(): void
	onDraw(): void
}

export function Tools({ selected, onMove, onHand, onText, onDraw }: ITools) {
	return (
		<div className={toolsStyles.container}>
			<div className={toolsStyles.bar}>
				<div onClick={onMove} className={selected === "move" ? toolsStyles.selected : ""}>
					Move
				</div>
				<div onClick={onHand} className={selected === "hand" ? toolsStyles.selected : ""}>
					Hand
				</div>
				<div onClick={onText} className={selected === "text" ? toolsStyles.selected : ""}>
					Text
				</div>
				<div onClick={onDraw} className={selected === "draw" ? toolsStyles.selected : ""}>
					Draw
				</div>
			</div>
		</div>
	)
}
