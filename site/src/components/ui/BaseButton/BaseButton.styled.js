import styled, { css } from "styled-components";

const baseButtonCSS = css`
	display: flex;
	align-items: center;
	justify-content: center;

	font-family: wix3, sans-serif;

	color: white;
	background: transparent;
	overflow: hidden;
	white-space: nowrap;
	font-size: 15px;
	line-height: 25px;
	height: 45px;
	width: min-content;
	min-width: 190px;
	padding: 0 15px;
	position: relative;
	cursor: pointer;
	outline: none;
	border-style: solid;
	text-decoration: none;
	border: 2px solid white;
	margin-top: 16px;

	&:hover,
	&:focus,
	&:active {
		background: rgba(14, 46, 71, 0.54);
	}
`;

export const BaseButton = styled.button`
	${baseButtonCSS}
`;
export const BaseLink = styled.a`
	${baseButtonCSS}
`;
