import React from "react"

import { SketchPicker } from "react-color"

import colorPickerStyles from "./colorPicker.module.css"

interface IColorPicker {}

export function ColorPicker(props: IColorPicker) {
	return (
		<div className={`${colorPickerStyles.container}`}>
			<SketchPicker />
		</div>
	)
}
