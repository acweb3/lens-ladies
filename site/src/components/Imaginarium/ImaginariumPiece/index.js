import { ImaginariumMint } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint";
import { ImaginariumOwner } from "components/Imaginarium/ImaginariumPiece/ImaginariumOwner";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumPiece.styled";
import { useListPrice } from "components/Imaginarium/hooks/useListPrice";
import { BaseButton } from "components/ui/BaseButton";
import { useModalViewContext } from "contexts/ModalViewContext";
import { useState } from "react";

export const ImaginariumPiece = ({ nft, ownerOf, isModal }) => {
	const [isVideo, setIsVideo] = useState(false);
	const { setModalView } = useModalViewContext();
	const { listPrice } = useListPrice();

	return (
		<S.ImaginariumPiece
			onMouseEnter={() => setIsVideo(true)}
			onMouseLeave={() => setIsVideo(false)}
		>
			<S.ImaginariumPieceMetadata>
				<S.ImaginariumImageWrapper
					isModal={isModal}
					isSold={Boolean(ownerOf) && !isModal}
				>
					{!(ownerOf && isVideo) && (
						<S.ImaginariumVideo
							autoPlay
							loop
							muted
							playsInline
							isActive={isVideo}
							src={nft.video}
						/>
					)}
					<S.ImaginariumImage alt={nft.name} src={nft.image} />
				</S.ImaginariumImageWrapper>
				<S.ImaginariumCopy>
					{nft.artist} — {nft.name}{" "}
					{listPrice && <>({listPrice} ETH)</>}
				</S.ImaginariumCopy>
				{isModal ? (
					<ImaginariumMint
						nft={nft}
						ownerOf={ownerOf}
						listPrice={listPrice}
					/>
				) : (
					<BaseButton.BaseButton
						onClick={() => {
							setModalView(nft);
						}}
					>
						{ownerOf ? "See Details" : "Mint"}
					</BaseButton.BaseButton>
				)}
				<ImaginariumOwner address={ownerOf} />
			</S.ImaginariumPieceMetadata>
			{isModal && (
				<S.ImaginariumPieceMetadata>
					<S.ImaginariumCopy
						style={{
							maxWidth: 480,
							textAlign: "center",
						}}
					>
						{nft.description}
					</S.ImaginariumCopy>
					<S.ImaginariumCopy
						style={{
							maxWidth: 480,
							textAlign: "center",
						}}
					>
						Charity: {nft.charity}
					</S.ImaginariumCopy>
				</S.ImaginariumPieceMetadata>
			)}
		</S.ImaginariumPiece>
	);
};
