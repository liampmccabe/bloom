import React from "react"

import drawStyles from "./draw.module.css"

interface IDraw {}

export function Draw({}: IDraw) {
	return (
		<div className={drawStyles.container}>
			<canvas className={drawStyles.canvas}></canvas>
		</div>
	)
}
