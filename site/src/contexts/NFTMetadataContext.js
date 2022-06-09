import { data } from "assets/data";
import { pullAsset } from "common/utils/pullAsset";
import { createContext, useContext, useEffect, useState } from "react";

const NFTMetadata = createContext({});
export const useNFTMetadataContext = () => useContext(NFTMetadata);

export const NFTMetadataContext = ({ children }) => {
	const [nfts, setNfts] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			const imagesMap = await Promise.all(
				data.map(async (next) => {
					return {
						...next,
						image: await pullAsset(next.key, false),
						video: await pullAsset(next.key, true),
					};
				})
			);

			setNfts(imagesMap);
		};

		fetchImages();
	}, []);

	return (
		<NFTMetadata.Provider value={{ nfts }}>{children}</NFTMetadata.Provider>
	);
};
