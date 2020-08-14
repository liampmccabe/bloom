import html2canvas from "html2canvas"
import { expose } from "comlink"
import jsPDF from "jspdf"

import canvasStyles from "src/canvas/index.module.css"

const createPDF = async () => {
	const pages = document.querySelectorAll(`.${canvasStyles.page}`)

	const pdf = new jsPDF()

	// @ts-ignore
	for (let page of pages) {
		page.style.boxShadow = "none"
		const canvas = await html2canvas(page)
		const dataURL = canvas.toDataURL()

		pdf.addImage(dataURL, "JPEG", 0, 0, 210, 297)
		pdf.addPage()
	}

	pdf.save("saved.pdf")
}

expose(createPDF)
