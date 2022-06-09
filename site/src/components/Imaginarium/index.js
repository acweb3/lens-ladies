import * as S from "components/Imaginarium/Imaginarium.styled";
import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import { useTokenOwnersContext } from "contexts/TokenOwnersContext";

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

export const Imaginarium = ({ nfts }) => {
	const { allTokenOwners } = useTokenOwnersContext();

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
								/>
							);
						})}
					</S.ImaginariumColumn>
				);
			})}
		</S.Imaginarium>
	);
};
