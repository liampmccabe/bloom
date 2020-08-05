import React, { useRef } from "react"

import { TextToolbar } from "src/canvas/components/toolbars/text/TextToolbar"

export function Heading(props: any) {
	const headingRef = useRef<any>(null)

	return (
		<>
			<span>{props.text}</span>
			<TextToolbar forwardRef={headingRef} editing={props.editing} />
		</>
	)
}
