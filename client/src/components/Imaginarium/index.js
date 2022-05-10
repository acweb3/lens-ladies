import { data } from "assets/data";
import * as S from "components/Imaginarium/Imaginarium.styled";
import { ImaginariumPiece } from "components/Imaginarium/ImaginariumPiece";
import { useImagesStaticQuery } from "graphql/queries/useImagesStaticQuery";

export const Imaginarium = () => {
	const imagesQueryResult = useImagesStaticQuery();
	const imagesMap = data.reduce((acc, next) => {
		return {
			...acc,
			[next.key]: next,
		};
	}, {});

	return (
		<S.Imaginarium>
			{imagesQueryResult.allImageSharp.edges.map((edge) => {
				return (
					<ImaginariumPiece
						key={edge.node.parent.name}
						piece={{
							gatsbyImageData: edge.node.gatsbyImageData,
							...imagesMap[edge.node.parent.name],
						}}
					/>
				);
			})}
		</S.Imaginarium>
	);
};
