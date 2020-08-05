import { useState } from "react"

export const useFetch = (): [any | null, (url: string) => Promise<void>] => {
	const [response, setResponse] = useState(null)

	const fetchData = async (url: string) => {
		try {
			const res = await fetch(url)
			const json = await res.json()
			setResponse(json)
		} catch (error) {
			setResponse(error)
		}
	}

	return [response, fetchData]
}
