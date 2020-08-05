export const getBoundingRect = (element: any) => {
	const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
	return { top, right, bottom, left, width, height, x, y }
}
