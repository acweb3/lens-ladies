import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import * as S from "components/MintModal/MintModal.styled";
import { useTokenOwnersContext } from "contexts/TokenOwnersContext";

export const MintModal = ({ nft }) => {
	const { allTokenOwners } = useTokenOwnersContext();

	return (
		<S.MintModal>
			<S.MintModalDialog>
				<ImaginariumPiece
					isModal
					nft={nft}
					ownerOf={
						allTokenOwners[nft.tokenId] &&
						allTokenOwners[nft.tokenId] !==
							"0x0000000000000000000000000000000000000000"
							? allTokenOwners[nft.tokenId]
							: undefined
					}
				/>
			</S.MintModalDialog>
		</S.MintModal>
	);
};
