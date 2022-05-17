import styled, { css } from "styled-components";

export const ImaginariumCopy = styled.div`
	margin-top: 16px;

	font-weight: bold;
	font-stretch: normal;
	font-size: 18px;
	line-height: 22px;
	font-family: wix3, sans-serif;
`;

export const ImaginariumVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 2;

	opacity: 0;
	transition: opacity 400ms;

	${(props) =>
		props.isActive &&
		css`
			opacity: 1;
		`}
`;

export const ImaginariumImageWrapper = styled.div`
	position: relative;
	max-width: 400px;
	overflow: hidden;

	${(props) =>
		props.isSold &&
		css`
			& > * {
				opacity: 0.4;
			}

			&::after {
				content: "SOLD";
				font-family: wix2;
				position: absolute;
				top: calc(50% - 24px);

				margin-left: auto;
				margin-right: auto;
				left: 0;
				right: 0;
				width: 40%;
				height: 48px;

				z-index: 2;

				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px dashed;
				letter-spacing: 2px;
			}
		`}
`;

export const ImaginariumPiece = styled.div`
	display: flex;
	flex-direction: column;
	margin: 32px;
`;
