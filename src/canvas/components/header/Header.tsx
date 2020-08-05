import React from "react"

import headerStyles from "./header.module.css"

interface IHeader {
	children: any
}

export function Header(props: IHeader) {
	return (
		<div className={headerStyles.container}>
			<div className={headerStyles.logo}>bloom</div>
			{props.children}
		</div>
	)
}
