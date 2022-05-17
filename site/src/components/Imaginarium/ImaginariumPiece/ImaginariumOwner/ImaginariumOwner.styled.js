import styled, { css } from "styled-components";

export const ImaginariumOwner = styled.div`
	font-family: wix1;
	font-size: 11px;
	margin-top: 16px;

	opacity: 0;
	transition: opacity 400ms;

	${(props) =>
		props.hasOwner &&
		css`
			opacity: 1;
		`}
`;
