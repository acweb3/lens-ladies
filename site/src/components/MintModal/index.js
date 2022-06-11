import { useDocumentListener } from "common/hooks/useDocumentListener";
import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import * as S from "components/MintModal/MintModal.styled";
import { useModalViewContext } from "contexts/ModalViewContext";
import { useTokenOwnersContext } from "contexts/TokenOwnersContext";
import { useEffect, useRef } from "react";

export const MintModal = ({ nft }) => {
	const ref = useRef();
	const { setModalView } = useModalViewContext();
	const { allTokenOwners } = useTokenOwnersContext();

	useDocumentListener(
		"keydown",
		(e) => {
			if (e.key === "Escape") {
				setModalView(undefined);
			}
		},
		[]
	);

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, []);

	return (
		<S.MintModal>
			<S.MintModalDialog ref={ref}>
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
				<S.MintModalX
					tabIndex={0}
					onClick={() => setModalView(undefined)}
				/>
			</S.MintModalDialog>
		</S.MintModal>
	);
};
