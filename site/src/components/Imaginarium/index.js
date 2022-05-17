import { data } from "assets/data";
import { pullAsset } from "common/utils/pullAsset";
import * as S from "components/Imaginarium/Imaginarium.styled";
import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import { useAllTokenOwners } from "components/Imaginarium/hooks/useAllTokenOwners";
import { useListPrice } from "components/Imaginarium/hooks/useListPrice";
import { useEffect, useState } from "react";

const chunk = (arr) => {
	return arr.reduce(
		(acc, next, i) => {
			if (i % 2 === 0) {
				return [[...acc[0], next], acc[1]];
			}

			return [acc[0], [...acc[1], next]];
		},
		[[], []]
	);
};

export const Imaginarium = () => {
	const [nfts, setNfts] = useState([]);
	const { allTokenOwners } = useAllTokenOwners();
	const { listPrice } = useListPrice();

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
		<S.Imaginarium>
			{chunk(nfts).map((nftColumn, i) => {
				return (
					<S.ImaginariumColumn key={i}>
						{nftColumn.map((nft) => {
							return (
								<ImaginariumPiece
									key={nft.key}
									nft={nft}
									ownerOf={
										allTokenOwners[nft.tokenId] &&
										allTokenOwners[nft.tokenId] !==
											"0x0000000000000000000000000000000000000000"
											? allTokenOwners[nft.tokenId]
											: undefined
									}
									listPrice={listPrice}
								/>
							);
						})}
					</S.ImaginariumColumn>
				);
			})}
		</S.Imaginarium>
	);
};
