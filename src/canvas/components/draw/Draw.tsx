import React, { useRef, useState, useEffect } from "react"

import drawStyles from "./draw.module.css"
import { useEventListener } from "src/canvas/utils/event"
import { awaitRaf } from "src/canvas/utils/raf"

interface IDraw {}

export function Draw({}: IDraw) {
	const [drawState, setDrawState] = useState<any>({})
	const canvasEl = useRef<any>(null)

	useEffect(() => {
		canvasEl.current.width = canvasEl.current.clientWidth * 2
		canvasEl.current.height = canvasEl.current.clientHeight * 2
	}, [])

	const handleMouseUp = (e: any) => {
		setDrawState({
			drawing: false
		})
	}

	const handleMouseDown = (e: any) => {
		setDrawState({
			drawing: true,
			context: canvasEl.current.getContext("2d")
		})
	}

	const handleMouseMove = (e: any) => {
		if (drawState.drawing) {
			drawState.context.beginPath()
			drawState.context.moveTo(e.clientX * 1.5 - 5, e.clientY * 1.5 - 5)
			drawState.context.lineTo(e.clientX * 1.5, e.clientY * 1.5)
			drawState.context.strokeStyle = "blue"
			drawState.context.lineWidth = 10
			drawState.context.stroke()
			drawState.context.closePath()
		}
	}

	useEventListener("mouseup", handleMouseUp, canvasEl.current)
	useEventListener("mousedown", handleMouseDown, canvasEl.current)
	useEventListener("mousemove", handleMouseMove, canvasEl.current)

	return (
		<div className={drawStyles.container}>
			<canvas className={drawStyles.canvas} ref={canvasEl}></canvas>
		</div>
	)
}
