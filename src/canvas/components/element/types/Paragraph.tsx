import React, { useRef } from "react"

import { TextToolbar } from "src/canvas/components/toolbars/text/TextToolbar"

export function Paragraph(props: any) {
	const paragraphRef = useRef<any>(null)

	return (
		<>
			<span ref={paragraphRef}>{props.text}</span>
			<TextToolbar forwardRef={paragraphRef} editing={props.editing} />
		</>
	)
}
