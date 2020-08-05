import React, { useState, useEffect, useRef, useCallback } from "react"

import { Elements } from "src/canvas/components/element/types"
import { ResizeHandles } from "src/canvas/components/resizeHandle/ResizeHandles"
import { ContextMenu } from "src/canvas/components/contextMenu/ContextMenu"

import { IElement } from "src/canvas/canvas"

import elementStyles from "./element.module.css"
import resizeHandleStyles from "src/canvas/components/resizeHandle/resizeHandle.module.css"

import { useEventListener } from "src/canvas/utils/event"
import { getBoundingRect } from "src/canvas/utils/node"

const initialState: Partial<IElement> = {
	editing: false,
	resizing: false,
	draggable: false,
	selected: false,
	contextMenu: {
		x: 0,
		y: 0,
		visible: false
	},
	resizeHandles: [
		["top", "left"],
		// ["top"],
		["top", "right"],
		// ["right"],
		["bottom", "right"],
		// ["bottom"],
		["bottom", "left"]
		// ["left"]
	],
	styles: {}
}

const transformOriginHelper: any = {
	"top left": "bottom right",
	"top right": "bottom left",
	"bottom left": "top right",
	"bottom right": "top left"
}

const isText = (type: string) => ["paragraph", "heading"].includes(type)

export function Element(props: IElement) {
	const [elementState, setElementState] = useState(initialState)
	const [styles, setStyles] = useState<any>({})
	const containerEl = useRef<any>(null)

	const ElementType = Elements[props.type]

	useEffect(() => {
		setElementState({
			...elementState,
			styles: {
				top: props.top,
				left: props.left,
				width: props.width,
				height: props.height,
				position: "absolute"
			}
		})
	}, [])

	useEffect(() => {
		setStyles({
			...styles,
			...elementState.styles
		})
	}, [elementState])

	const handleMouseDown = ({ button, target, clientX, clientY }: any) => {
		if (button === 1 || button === 2) {
			return false
		}

		if (isInsideNode(target, containerEl.current)) {
			const { top, left } = getBoundingRect(target)

			const xOffset = clientX - left - target.offsetLeft
			const yOffset = clientY - top - target.offsetTop

			setElementState({
				...elementState,
				selected: true,
				draggable: true,
				boundTop: top + yOffset,
				boundLeft: left + xOffset
			})

			if (isResizeHandle(target)) {
				const transformOrigin = target.dataset.position

				setElementState({
					...elementState,
					resizing: true,
					styles: {
						...elementStyles,
						transformOrigin: transformOriginHelper[transformOrigin]
					}
				})
			}

			if (elementState.selected && isText(props.type)) {
				setElementState({
					...elementState,
					editing: true
				})
			}
		} else {
			setElementState({
				...elementState,
				editing: false,
				selected: false,
				draggable: false,
				contextMenu: {
					x: 0,
					y: 0,
					visible: false
				}
			})
		}
	}

	const handleMouseUp = ({ clientX, clientY }: any) => {
		const {
			boundTop,
			boundLeft,
			selected,
			draggable,
			resizing,
			editing,
			styles,
			styles: { top, left }
		} = elementState

		let updatedElementState = elementState

		if (selected && draggable && !resizing && !editing) {
			updatedElementState = {
				...elementState,
				styles: {
					...styles,
					top: clientY - boundTop! + top!,
					left: clientX - boundLeft! + left!,
					transform: "unset"
				}
			}
		}

		setElementState({
			...updatedElementState,
			draggable: false,
			resizing: false
		})
	}

	const handleMouseMove = useCallback(
		({ clientX, clientY }: any) => {
			const { selected, draggable, resizing, styles, boundTop, boundLeft } = elementState

			if (selected && draggable && !resizing) {
				setElementState({
					...elementState,
					styles: {
						...styles,
						transform: `translate3d(${clientX - boundLeft!}px, ${clientY - boundTop!}px, 0)`
					}
				})
			}

			if (resizing) {
				setElementState({
					...elementState,
					styles: {
						...styles,
						transform: `translate3d(${clientX - boundLeft!}px, ${clientY - boundTop!}px, 0) scale(2)`
					}
				})
			}
		},
		[elementState]
	)

	const handleMouseLeave = (e: any) => {}

	const handleClick = (e: any) => {}

	const handleContextMenu = (e: any) => {
		e.preventDefault()

		if (isInsideNode(e.target, containerEl.current)) {
			setElementState({
				...elementState,
				contextMenu: {
					x: e.clientX,
					y: e.clientY,
					visible: true
				}
			})
		} else {
			setElementState({
				...elementState,
				contextMenu: {
					x: 0,
					y: 0,
					visible: false
				}
			})
		}
	}

	const handleCopy = (e: any) => {}

	const handlePaste = (e: any) => {}

	const handleRemove = (e: any) => {}

	const handleSendToBack = (e: any) => {}

	const handleSendBackWard = (e: any) => {}

	const handleSendForward = (e: any) => {}

	const handleBringToFront = (e: any) => {}

	// TODO: Fix includes
	const isResizeHandle = (target: any) =>
		target.className.includes && target.className.includes(resizeHandleStyles.container)

	const isInsideNode = (target: any, node: any) => node.contains(target)

	useEventListener("click", handleClick)
	useEventListener("mouseleave", handleMouseLeave)
	useEventListener("mousedown", handleMouseDown)
	useEventListener("mousemove", handleMouseMove)
	useEventListener("mouseup", handleMouseUp)
	useEventListener("contextmenu", handleContextMenu)

	const { selected, editing, resizeHandles: handles, contextMenu } = elementState

	return (
		<>
			<div
				ref={containerEl}
				className={`${elementStyles.container} ${selected ? elementStyles.selected : ""}`}
				style={styles}>
				{selected && <ResizeHandles handles={handles} />}
				<ElementType {...props} editing={editing} />
				{contextMenu && contextMenu.visible && (
					<ContextMenu
						style={{ transform: `translate3d(${contextMenu.x}px, ${contextMenu.y}px, 0)` }}
						onCopy={handleCopy}
						onPaste={handlePaste}
						onRemove={handleRemove}
						onSendToBack={handleSendToBack}
						onSendBackward={handleSendBackWard}
						onSendForward={handleSendForward}
						onBringToFront={handleBringToFront}
					/>
				)}
			</div>
		</>
	)
}
