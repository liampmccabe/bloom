import { useState } from "react"
import { useEventListener } from "src/canvas/utils/event"

export const useKey = () => {
	const [keycode, setKeycode] = useState(null)

	const handleKeyUp = () => {
		setKeycode(null)
	}

	const handleKeyDown = ({ keyCode }: any) => {
		setKeycode(keyCode)
	}

	useEventListener("keydown", handleKeyDown)
	useEventListener("keyup", handleKeyUp)

	return keycode
}
