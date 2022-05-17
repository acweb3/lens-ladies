import { ThreeDots } from "react-loading-icons";
import styled, { css } from "styled-components";

export const ImaginariumMintLoader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const ImaginariumMintError = styled.div`
	color: #f00;
	font-style: italic;
	width: 100%;
`;

const imaginariumMintCss = css`
	display: flex;
	align-items: center;
	justify-content: center;

	font-family: wfont_6dd698_5add2e41e15b44c2959e189c19647ab7,
		wf_5add2e41e15b44c2959e189c1, orig_sweetsansprolight, sans-serif;

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
	z-index: 10;
	cursor: pointer;
	outline: none;
	border-style: solid;
	text-decoration: none;
	border: 2px solid white;

	&:hover,
	&:focus,
	&:active {
		background: rgba(14, 46, 71, 0.54);
	}
`;

export const ImaginariumMintButton = styled.button`
	${imaginariumMintCss}
`;
export const ImaginariumMintLink = styled.a`
	${imaginariumMintCss}
`;

export const ImaginariumMint = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	margin-top: 16px;
`;
