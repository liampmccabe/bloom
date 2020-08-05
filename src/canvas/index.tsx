import React, { useState, useEffect, useRef } from "react"

import { Selector } from "src/canvas/components/selector/Selector"

import { Element } from "src/canvas/components/element/Element"
import { Header } from "src/canvas/components/header/Header"
import { UndoRedo } from "src/canvas/components/undoredo/UndoRedo"
import { Tools } from "src/canvas/components/tools/Tools"
import { Move } from "src/canvas/components/move/Move"
import { Zoom } from "src/canvas/components/zoom/Zoom"
import { Export } from "src/canvas/components/export/Export"
import { Draw } from "src/canvas/components/draw/Draw"
import { ColorPicker } from "src/canvas/components/colorPicker/ColorPicker"
import { PageControls } from "src/canvas/components/pageControls/PageControls"
import { Assets } from "src/canvas/components/assets/Assets"

import { IGroup, IElement } from "src/canvas/canvas"

import canvasStyles from "src/canvas/index.module.css"

import { useKey } from "./utils/key"
import { useEventListener } from "./utils/event"
import { awaitRaf } from "./utils/raf"

interface ICanvasProps {
	template: IGroup
}

interface ICanvasState {
	pages: any
	loaded: boolean
	panning: boolean
	zoom: number
	position: {
		x: number
		y: number
	}
	smoothPosition: {
		x: number
		y: number
	}
	mousedownPosition: {
		x: number
		y: number
	}
	toolSelected: string
	pageSelected: number
}

const cursorTool: any = {
	move: "default",
	hand: "grab",
	text: "crosshair",
	image: "crosshair",
	draw: "crosshair"
}

export function Canvas({ template }: ICanvasProps) {
	const [canvasState, setCanvasState] = useState<ICanvasState>({
		pages: [],
		loaded: false,
		panning: false,
		zoom: 1,
		position: {
			x: 0,
			y: 0
		},
		smoothPosition: {
			x: 0,
			y: 0
		},
		mousedownPosition: {
			x: 0,
			y: 0
		},
		toolSelected: "move",
		pageSelected: 0
	})

	const key = useKey()
	const viewportEl = useRef<any>(null)

	const loadTemplate = () => {
		const pages = []
		let pageIndex = 0

		const loadedTemplate: any = template

		for (let page of loadedTemplate.pages) {
			let index = 0
			const elements: any = []

			for (let elementData of page.elements) {
				const elementInterface = { ...elementData } as IElement
				elements.push(<Element key={`element-${pageIndex}-${index}`} {...elementInterface} />)
				index++
			}

			pages.push({
				...page,
				elements
			})

			pageIndex++

			setCanvasState({
				...canvasState,
				loaded: true,
				pages
			})
		}
	}

	const handleWheel = (e: any) => {
		e.preventDefault()

		awaitRaf(() => {
			//cmd ctrl
			if (key === 91 || key === 17) {
				e.preventDefault()

				let scale = canvasState.zoom
				scale += e.deltaY * -0.01
				scale = Math.min(Math.max(0.25, scale), 4)

				setCanvasState({ ...canvasState, zoom: scale })
			} else {
				setCanvasState({
					...canvasState,
					position: {
						x: canvasState.position.x - e.deltaX,
						y: canvasState.position.y - e.deltaY
					},
					smoothPosition: {
						x: canvasState.smoothPosition.x + (canvasState.position.x - canvasState.smoothPosition.x) * 0.5,
						y: canvasState.smoothPosition.y + (canvasState.position.y - canvasState.smoothPosition.y) * 0.5
					}
				})
			}
		})
	}

	const handleMouseDown = (e: any) => {
		if (e.button === 1 || canvasState.toolSelected === "hand") {
			setCanvasState({
				...canvasState,
				panning: true,
				toolSelected: "hand",
				mousedownPosition: {
					x: e.clientX - x,
					y: e.clientY - y
				}
			})

			e.stopPropagation()
		}
	}

	const handleMouseMove = (e: any) => {
		awaitRaf(() => {
			if (canvasState.panning) {
				setCanvasState({
					...canvasState,
					position: {
						x: e.clientX - canvasState.mousedownPosition.x,
						y: e.clientY - canvasState.mousedownPosition.y
					},
					smoothPosition: {
						x: canvasState.smoothPosition.x + (canvasState.position.x - canvasState.smoothPosition.x) * 0.5,
						y: canvasState.smoothPosition.y + (canvasState.position.y - canvasState.smoothPosition.y) * 0.5
					}
				})
			}
		})
	}

	const handleMouseUp = (e: any) => {
		setCanvasState({
			...canvasState,
			panning: false
		})
	}

	const handleDragStart = (e: any) => {
		e.preventDefault()
		console.log(e)
	}

	const handleDragOver = (e: any) => {
		e.preventDefault()
	}

	const handleDrop = (e: any) => {
		e.preventDefault()

		const url = e.dataTransfer.getData("URL")

		console.log(e)

		if (e.toElement.dataset && e.toElement.dataset.index) {
			const index = +e.toElement.dataset.index

			const elementInterface = {} as IElement

			setCanvasState({
				...canvasState,
				pages: [
					...canvasState.pages.slice(0, index),
					{
						...canvasState.pages[index],
						elements: [
							...canvasState.pages[index].elements,
							<Element {...elementInterface} type="image" src={url} top={e.offsetY} left={e.offsetX} />
						]
					},
					...canvasState.pages.slice(index, canvasState.pages.length)
				]
			})
		}
	}

	useEventListener("wheel", handleWheel, viewportEl.current)
	useEventListener("mousedown", handleMouseDown, viewportEl.current)
	useEventListener("mousemove", handleMouseMove, viewportEl.current)
	useEventListener("mouseup", handleMouseUp, viewportEl.current)
	useEventListener("dragstart", handleDragStart, viewportEl.current)
	useEventListener("dragover", handleDragOver, viewportEl.current)
	useEventListener("drop", handleDrop, viewportEl.current)

	useEffect(() => {
		loadTemplate()
	}, [])

	useEffect(() => {
		console.log(key)

		//-
		if (key === 189) {
			zoomOut()
		}

		//=
		if (key === 187) {
			zoomIn()
		}

		//i
		if (key === 73) {
			setTool("image")
		}

		//t
		if (key === 84) {
			setTool("text")
		}

		//v
		if (key === 86) {
			setTool("move")
		}

		//h
		if (key === 72) {
			setTool("hand")
		}

		//0
		if (key === 48) {
			zoom100()
		}

		//up
		if (key === 38) {
			moveUp()
		}

		//right
		if (key === 39) {
			moveRight()
		}

		//down
		if (key === 40) {
			moveDown()
		}

		//left
		if (key === 37) {
			moveLeft()
		}
	}, [key])

	const setTool = (tool: string) => setCanvasState({ ...canvasState, toolSelected: tool })

	const moveUp = () =>
		setCanvasState({
			...canvasState,
			position: { x: canvasState.position.x, y: canvasState.position.y + 20 },
			smoothPosition: { x: canvasState.position.x, y: canvasState.position.y + 20 }
		})

	const moveDown = () =>
		setCanvasState({
			...canvasState,
			position: { x: canvasState.position.x, y: canvasState.position.y - 20 },
			smoothPosition: { x: canvasState.position.x, y: canvasState.position.y - 20 }
		})

	const moveLeft = () =>
		setCanvasState({
			...canvasState,
			position: { x: canvasState.position.x + 20, y: canvasState.position.y },
			smoothPosition: { x: canvasState.position.x + 20, y: canvasState.position.y }
		})

	const moveRight = () =>
		setCanvasState({
			...canvasState,
			position: { x: canvasState.position.x - 20, y: canvasState.position.y },
			smoothPosition: { x: canvasState.position.x - 20, y: canvasState.position.y }
		})

	const zoomIn = () => setCanvasState({ ...canvasState, zoom: canvasState.zoom + 0.05 })

	const zoomOut = () => setCanvasState({ ...canvasState, zoom: canvasState.zoom - 0.05 })

	const zoom100 = () => setCanvasState({ ...canvasState, zoom: 1 })

	const duplicatePage = (index: number) =>
		setCanvasState({
			...canvasState,
			pages: [
				...canvasState.pages.slice(0, index + 1),
				canvasState.pages[index],
				...canvasState.pages.slice(index + 1, canvasState.pages.length)
			]
		})

	const addNewPage = (index: number) =>
		setCanvasState({
			...canvasState,
			pages: [
				...canvasState.pages.slice(0, index + 1),
				{ title: "New page", elements: [] },
				...canvasState.pages.slice(index + 1, canvasState.pages.length)
			]
		})

	const deletePage = (index: number) => {
		setCanvasState({
			...canvasState,
			pages: canvasState.pages.filter((page: any, i: number) => i !== index)
		})
	}

	const addPageBackground = () => console.log("add page background")

	const setPageSelected = (e: any, index: number) => {
		if (canvasState.pageSelected !== index) {
			setCanvasState({ ...canvasState, pageSelected: index })
		}
	}

	const {
		pages,
		panning,
		smoothPosition: { x, y },
		zoom,
		toolSelected,
		pageSelected
	} = canvasState

	return (
		<div className={canvasStyles.viewport} ref={viewportEl} style={{ cursor: cursorTool[toolSelected] }}>
			<div className={canvasStyles.tools}>
				{toolSelected === "move" && !panning && <Selector />}
				<Header>
					<Export />
				</Header>
				<UndoRedo onUndo={() => {}} onRedo={() => {}} />
				<Tools
					selected={toolSelected}
					onMove={() => setTool("move")}
					onHand={() => setTool("hand")}
					onText={() => setTool("text")}
					onDraw={() => setTool("draw")}
				/>
				<Move x={x} y={y} onMoveUp={moveUp} onMoveDown={moveDown} onMoveLeft={moveLeft} onMoveRight={moveRight} />
				<Zoom amount={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onZoomClick={zoom100} />
				{/* <Draw /> */}
				{/* <ColorPicker /> */}
			</div>
			<div className={canvasStyles.container}>
				<div className={canvasStyles.pages} style={{ transform: `scale(${zoom}) translate3d(${x}px, ${y}px, 0)` }}>
					{pages.map((page: any, index: number) => {
						return (
							<div
								key={`page-${index}`}
								data-index={index}
								className={canvasStyles.pageContainer}
								onClick={(e: any) => setPageSelected(e, index)}>
								{pageSelected === index && (
									<PageControls
										index={index}
										onDuplicatePage={() => duplicatePage(index)}
										onDeletePage={() => deletePage(index)}
										onAddNewPage={() => addNewPage(index)}
										addPageBackground={addPageBackground}
									/>
								)}

								<div className={canvasStyles.page} data-index={index}>
									{page.elements}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
