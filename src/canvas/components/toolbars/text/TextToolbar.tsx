import Quill from "quill"
import { useState, useEffect } from "react"

import "src/vendor/quill/bubble.css"

const toolbarOptions = [
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }]
]

interface ITextToolbar {
	editing: boolean
	forwardRef: any
}

export function TextToolbar({ editing, forwardRef }: ITextToolbar) {
	const [editor, setEditor] = useState<any>(null)
	useEffect(() => {
		if (editing) {
			if (editor) {
				editor.enable()
			} else {
				setEditor(
					new Quill(forwardRef.current, {
						modules: { toolbar: toolbarOptions },
						theme: "bubble"
					})
				)
			}
		} else {
			if (editor) {
				editor.disable()
			}
		}
	}, [editing])

	return null
}
