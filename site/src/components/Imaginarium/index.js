import * as S from "components/Imaginarium/Imaginarium.styled";
import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import { useTokenOwnersContext } from "contexts/TokenOwnersContext";

export const Imaginarium = ({ nfts }) => {
	const { allTokenOwners } = useTokenOwnersContext();

	return (
		<S.Imaginarium>
			<S.ImaginariumColumn>
				{nfts.map((nft) => {
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
		</S.Imaginarium>
	);
};
