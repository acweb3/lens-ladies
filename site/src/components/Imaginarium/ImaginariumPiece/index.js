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
			<S.ImaginariumPieceMetadata
				onMouseEnter={() => setIsVideo(true)}
				onMouseLeave={() => setIsVideo(false)}
			>
				<S.ImaginariumImageWrapper isSold={Boolean(ownerOf)}>
					{!ownerOf && (
						<S.ImaginariumVideo
							autoPlay
							loop
							muted
							playsInline
							isActive={isVideo}
							src={nft.video}
						/>
					)}
					<img alt={nft.name} src={nft.image} />
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
						Mint
					</BaseButton.BaseButton>
				)}
				<ImaginariumOwner address={ownerOf} />
			</S.ImaginariumPieceMetadata>
			{isModal && (
				<S.ImaginariumCopy
					style={{
						marginTop: 32,
						maxWidth: 640,
					}}
				>
					{nft.description}
				</S.ImaginariumCopy>
			)}
		</S.ImaginariumPiece>
	);
};
