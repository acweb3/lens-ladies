import styled from "styled-components";

export const MintModalDialog = styled.div`
	background: ${(props) => props.theme.colors.blue[0]};
	padding: 32px;
	overflow: scroll;

	max-width: 80%;
	height: 75%;
	margin: 12.5% auto;

	border-radius: 32px;
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
	position: fixed;
	z-index: 5;

	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.16);
`;
