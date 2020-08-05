import React from "react"

import resizeHandleStyles from "./resizeHandle.module.css"

interface IResizeHandle {
	position: string[]
}

export function ResizeHandle(props: IResizeHandle) {
	return (
		<div
			className={`${resizeHandleStyles.container} ${props.position.map(pos => resizeHandleStyles[pos]).join(" ")}`}
			data-position={props.position.join(" ")}>
			<div className={resizeHandleStyles.handle}></div>
		</div>
	)
}
