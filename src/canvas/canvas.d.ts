export interface IGroup {
	pages: {
		title: string
		background?: string
		elements: Partial<IElement>[]
	}[]
}

export interface IElement {
	debug: boolean

	type: string
	name: string
	top: number
	left: number
	boundTop: number
	boundLeft: number
	width: number
	height: number
	text?: string
	src?: string
	locked?: boolean

	styles: any
	editing: boolean
	resizing: boolean
	draggable: boolean
	selected: boolean
	contextMenu: {
		x: number
		y: number
		visible: boolean
	}
	pageSelected: number
	resizeHandles: string[][]
	contentEditable: boolean
}
