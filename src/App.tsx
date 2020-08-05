import React from "react"

import { Canvas } from "src/canvas"
import { Assets } from "src/canvas/components/assets/Assets"

import { ExampleTemplate } from "src/templates/example"

function App() {
	return (
		<>
			<Canvas template={ExampleTemplate} />
			<Assets />
		</>
	)
}

export default App
