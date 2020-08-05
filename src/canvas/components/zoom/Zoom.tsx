import React from "react"

import zoomStyles from "./zoom.module.css"

interface IZoom {
	amount: number
	onZoomIn(): void
	onZoomOut(): void
	onZoomClick(): void
}

export function Zoom({ amount, onZoomIn, onZoomOut, onZoomClick }: IZoom) {
	return (
		<div className={zoomStyles.container}>
			<div onClick={onZoomIn}>Zoom in</div>
			<div onClick={onZoomOut}>Zoom out</div>
			<div onClick={onZoomClick}>{Math.floor(amount * 100)}%</div>
		</div>
	)
}
