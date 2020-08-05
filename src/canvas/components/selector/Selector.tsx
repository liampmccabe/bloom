import React, { useState, useCallback } from "react"

import elementStyles from "../element/element.module.css"
import selectorStyles from "./selector.module.css"

import { shallowCompareIsEqual } from "src/canvas/utils/object"
import { useEventListener } from "src/canvas/utils/event"
import { getBoundingRect } from "src/canvas/utils/node"

const restrictedElems = ["html", "body"]

const initialSelectorState = {
	top: -10,
	right: 0,
	bottom: 0,
	left: -10,
	width: 0,
	height: 0,
	x: 0,
	y: 0
}

const initialSelectorBoxState = {
	active: false,
	width: 0,
	height: 0,
	x: 0,
	y: 0
}

let boundingRect: any = {}
let mouseUpTriggered: boolean = false

export function Selector() {
	const [selectorState, setSelectorState] = useState<any>(initialSelectorState)
	const [selectorBoxState, setSelectorBoxState] = useState<any>(initialSelectorBoxState)

	const handleMouseMove = useCallback(
		({ path, clientX, clientY }) => {
			if (mouseUpTriggered) {
				mouseUpTriggered = false
				return false
			}

			if (selectorBoxState.active) {
				setSelectorBoxState({
					...selectorBoxState,
					x: clientX < selectorBoxState.initialX ? clientX : selectorBoxState.x,
					y: clientY < selectorBoxState.initialY ? clientY : selectorBoxState.y,
					width: Math.abs(clientX - selectorBoxState.initialX),
					height: Math.abs(clientY - selectorBoxState.initialY)
				})
			} else {
				if (path?.length > 0) {
					if (
						path[1].className &&
						path[1].className.includes &&
						path[1].className.includes(elementStyles.container) &&
						!path[1].className.includes(elementStyles.selected) &&
						!restrictedElems.includes(path[0].localName)
					) {
						boundingRect = getBoundingRect(path[0])

						if (!shallowCompareIsEqual(boundingRect, selectorState)) {
							setSelectorState({ ...selectorState, ...boundingRect })
						}
					} else {
						setSelectorState({})
					}
				}
			}
		},
		[selectorState, selectorBoxState]
	)

	const handleMouseDown = ({ button, target, clientX, clientY }: any) => {
		if (button === 2) {
			return false
		}

		if (!target.closest(`.${elementStyles.container}`) && !target.className.includes(elementStyles.container)) {
			setSelectorState({
				...selectorState,
				x: 0,
				y: 0,
				width: 0,
				height: 0
			})

			setSelectorBoxState({
				...selectorBoxState,
				active: true,
				x: clientX,
				y: clientY,
				initialX: clientX,
				initialY: clientY
			})
		}
	}

	const handleMouseUp = () => {
		mouseUpTriggered = true

		setSelectorBoxState({
			...selectorBoxState,
			active: false,
			x: 0,
			y: 0,
			width: 0,
			height: 0
		})
	}

	// useEventListener("mouseup", handleMouseUp)
	// useEventListener("mousedown", handleMouseDown)
	useEventListener("mousemove", handleMouseMove)

	const { x, y, width, height } = selectorState

	return (
		<>
			<div className={selectorStyles.container} style={{ top: y, left: x, width, height }}></div>
			<SelectorBox className={selectorStyles.selectorBox} styles={selectorBoxState} />
		</>
	)
}

function SelectorBox({ styles: { x, y, width, height } }: any) {
	return <div className={selectorStyles.selectorBox} style={{ top: y, left: x, width, height }}></div>
}
