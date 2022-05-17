export const pullAsset = async (assetName, isVideo) =>
	(await import(`assets/images/${assetName}.${isVideo ? "mp4" : "webp"}`))
		.default;
