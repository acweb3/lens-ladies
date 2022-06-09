import { ThreeDots } from "react-loading-icons";
import styled from "styled-components";

export const ImaginariumMintLoader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const ImaginariumMintError = styled.div`
	color: #f00;
	font-style: italic;
	width: 100%;
`;

export const ImaginariumMint = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	margin-top: 16px;
`;
