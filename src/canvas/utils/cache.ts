export const setCache = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data))
}

export const getCache = (key: string) => {
	try {
		const data = localStorage.getItem(key)
		return JSON.parse(data!)
	} catch (e) {
		console.error(e)
	}
}
