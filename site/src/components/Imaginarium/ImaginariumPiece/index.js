import { ImaginariumMint } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint";
import { ImaginariumOwner } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumOwner";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumPiece.styled";
import { useState } from "react";

export const ImaginariumPiece = ({ nft, ownerOf }) => {
	const [isVideo, setIsVideo] = useState(false);

	return (
		<S.ImaginariumPiece
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
				{nft.artist} — {nft.name} (2.2ETH)
			</S.ImaginariumCopy>
			<ImaginariumMint nft={nft} ownerOf={ownerOf} />
			{ownerOf && <ImaginariumOwner address={ownerOf} />}
		</S.ImaginariumPiece>
	);
};
