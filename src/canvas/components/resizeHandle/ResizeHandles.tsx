import React from "react"

import { ResizeHandle } from "./ResizeHandle"

interface IResizeHandles {
	handles?: string[][]
}

export function ResizeHandles({ handles }: IResizeHandles) {
	return (
		<>
			{handles?.map((handle: any, index: number) => (
				<ResizeHandle key={`ResizeHandle-${index}`} position={handle} />
			))}
		</>
	)
}
