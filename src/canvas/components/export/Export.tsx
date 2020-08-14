import { wrap } from "comlink"
import React from "react"

// eslint-disable-next-line import/no-webpack-loader-syntax
// import Worker from "worker-loader!./src/canvas/workers/ExportPdfWorker"

import exportStyles from "./export.module.css"

interface IExport {}

export function Export(props: IExport) {
	const onClick = async () => {
		// const worker = new Worker()
		// const createPdf: any = wrap(worker)
		// await createPdf()
	}

	return (
		<div className={exportStyles.container}>
			<div onClick={onClick}>Export</div>
		</div>
	)
}
