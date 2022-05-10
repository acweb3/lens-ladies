import { graphql, useStaticQuery } from "gatsby";

export const useImagesStaticQuery = () =>
	useStaticQuery(graphql`
		query ImagesStaticQueryQuery {
			allImageSharp {
				edges {
					node {
						gatsbyImageData(width: 480)
						parent {
							... on File {
								name
							}
						}
					}
				}
			}
		}
	`);
