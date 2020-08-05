import React from "react"

import pageControlsStyles from "./pageControls.module.css"

interface IPageControls {
	index: number
	onDuplicatePage(): void
	onDeletePage(): void
	onAddNewPage(): void
	addPageBackground(): void
}

export function PageControls({ index, onDuplicatePage, onDeletePage, onAddNewPage, addPageBackground }: IPageControls) {
	return (
		<div className={pageControlsStyles.container}>
			<div className={pageControlsStyles.info}>
				<span>Page {index + 1} </span>
				{/* <span>Add page title</span> */}
			</div>
			<div className={pageControlsStyles.controls}>
				<span onClick={onDuplicatePage}>Duplicate page</span>
				<span onClick={onDeletePage}>Delete page</span>
				<span onClick={onAddNewPage}>Add new page</span>
				<span onClick={addPageBackground}>Add background</span>
			</div>
		</div>
	)
}
