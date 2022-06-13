import styled from "styled-components";

export const ImaginariumColumn = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 640px;
`;

export const Imaginarium = styled.section`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	background-color: ${(props) => props.theme.colors.blue[0]};
`;
