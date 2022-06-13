import { data } from "assets/data";
import { pullAsset } from "common/utils/pullAsset";
import { createContext, useContext, useEffect, useState } from "react";

/*
1 - Tina
2 - Regina
3 - jenna
4 - Melanie
5 - Sarah
6 - Lauren
7- Grace
8- Shannon
9 - Anna
*/
const ARRAY_ORDER = [0, 3, 8, 5, 2, 7, 1, 6, 4];

const NFTMetadata = createContext({});
export const useNFTMetadataContext = () => useContext(NFTMetadata);

export const NFTMetadataContext = ({ children }) => {
	const [nfts, setNfts] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			const nftsWithImages = await Promise.all(
				data.map(async (next) => {
					return {
						...next,
						image: await pullAsset(next.key, false),
						video: await pullAsset(next.key, true),
					};
				})
			);

			nftsWithImages.sort((nftA, nftB) => {
				return (
					ARRAY_ORDER.indexOf(parseInt(nftA.tokenId)) -
					ARRAY_ORDER.indexOf(parseInt(nftB.tokenId))
				);
			});

			setNfts(nftsWithImages);
		};

		fetchImages();
	}, []);

	return (
		<NFTMetadata.Provider value={{ nfts }}>{children}</NFTMetadata.Provider>
	);
};
