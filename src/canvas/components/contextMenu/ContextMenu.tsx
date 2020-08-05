import React from "react"

import contextMenuStyles from "./contextMenu.module.css"

interface IContextMenu {
	style: any
	onCopy(e: any): void
	onPaste(e: any): void
	onRemove(e: any): void
	onSendToBack(e: any): void
	onSendBackward(e: any): void
	onSendForward(e: any): void
	onBringToFront(e: any): void
}

export function ContextMenu({
	style,
	onCopy,
	onPaste,
	onRemove,
	onSendToBack,
	onSendBackward,
	onSendForward,
	onBringToFront
}: IContextMenu) {
	return (
		<div className={contextMenuStyles.container} style={style}>
			<ul className={contextMenuStyles.list}>
				<li className={contextMenuStyles.listItem} onClick={onCopy}>
					Copy <span>⌘c</span>
				</li>
				<li className={contextMenuStyles.listItem} onClick={onPaste}>
					Paste <span>⌘v</span>
				</li>
				<li className={contextMenuStyles.listItem} onClick={onRemove}>
					Delete <span>DEL</span>
				</li>
				<li className={contextMenuStyles.listItemDivide}></li>
				<li className={contextMenuStyles.listItem} onClick={onSendToBack}>
					Send to back <span>⌥⌘[</span>
				</li>
				<li className={contextMenuStyles.listItem} onClick={onSendBackward}>
					{" "}
					Send Backward <span>⌘[</span>
				</li>
				<li className={contextMenuStyles.listItem} onClick={onSendForward}>
					Send Forward <span>⌘]</span>
				</li>
				<li className={contextMenuStyles.listItem} onClick={onBringToFront}>
					Bring to front <span>⌥⌘]</span>
				</li>
			</ul>
		</div>
	)
}
