import Quill from "quill"
import React, { useEffect } from "react"

import textToolbarStyles from "./textToolbar.module.css"

import "src/vendor/quill/bubble.css"

const toolbarOptions = [
	["bold", "italic", "underline"]
	// ["bold", "italic", "underline", "strike"]

	// [{ size: ["small", false, "large", "huge"] }],
	// [{ header: [1, 2, 3, 4, 5, 6, false] }],

	// [{ color: [] }, { background: [] }]
	// [{ align: [] }],

	// ["clean"]
]

interface ITextToolbar {
	forwardRef: any
}

export function TextToolbar(props: ITextToolbar) {
	useEffect(() => {
		new Quill(props.forwardRef.current, {
			modules: { toolbar: toolbarOptions },
			theme: "bubble"
		})
	}, [])

	return null
}
