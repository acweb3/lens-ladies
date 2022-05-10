import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumPiece.styled";
import { GatsbyImage } from "gatsby-plugin-image";

export const ImaginariumPiece = ({ piece }) => {
	console.log({ piece });
	return (
		<S.ImaginariumPiece>
			<GatsbyImage
				alt={piece.name}
				image={piece.gatsbyImageData}
				layout="fixed"
				width={400}
			/>
			<div>
				{piece.artist} — {piece.name}
			</div>
		</S.ImaginariumPiece>
	);
};
