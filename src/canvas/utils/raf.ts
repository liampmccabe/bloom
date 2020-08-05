var lastUpdateCall: any = null

export const awaitRaf = (callback: any) => {
	if (lastUpdateCall) cancelAnimationFrame(lastUpdateCall)

	lastUpdateCall = requestAnimationFrame(() => {
		callback()

		lastUpdateCall = null
	})
}
