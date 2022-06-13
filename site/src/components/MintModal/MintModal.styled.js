import { ReactComponent as X } from "assets/icons/x.svg";
import styled from "styled-components";

export const MintModalX = styled(X)`
	color: ${(props) => props.theme.colors.white[0]};
	width: 24px;
	height: 24px;

	position: absolute;
	top: 24px;
	right: 32px;

	cursor: pointer;
`;

export const MintModalDialog = styled.div`
	position: relative;

	background: ${(props) => props.theme.colors.blue[0]};
	padding: 64px 8px 32px;
	overflow: scroll;

	min-height: 100vh;
	height: 100%;
	width: 100%;

	${(props) => props.theme.breakpoints.extraSmall`
		border-radius: 32px;
		padding: 32px;
		margin: 100px auto 0;
		height: initial;
		min-height: min-content;
		width: max-content;
	`}
`;

export const MintModalDialogWrapper = styled.div`
	position: fixed;
	z-index: 6;

	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const MintModal = styled.div`
	position: absolute;
	z-index: 5;

	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.16);
`;
