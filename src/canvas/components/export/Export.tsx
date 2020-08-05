//@ts-nocheck
import html2canvas from "html2canvas"
import React from "react"
import jsPDF from "jspdf"

import exportStyles from "./export.module.css"
import canvasStyles from "src/canvas/index.module.css"

interface IExport {}

export function Export(props: IExport) {
	const createPDF = () => {
		const source = document.querySelector(`.${canvasStyles.page}`)
		source.style.boxShadow = "none"

		html2canvas(source).then(canvas => {
			const dataURL = canvas.toDataURL()
			const pdf = new jsPDF()

			pdf.addImage(dataURL, "JPEG", 0, 0, 210, 297)

			pdf.save("saved.pdf")
		})
	}

	return (
		<div className={exportStyles.container}>
			<div onClick={createPDF}>Export</div>
		</div>
	)
}
