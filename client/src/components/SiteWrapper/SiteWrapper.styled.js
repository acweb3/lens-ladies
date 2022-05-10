import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: ${(props) => props.theme.fontFamily.sansSerif};
        color: ${(props) => props.theme.colors.black[0]};
        background: ${(props) => props.theme.colors.white[0]};
        max-width: 100vw;
    }
`;

export const Main = styled.main`
	position: relative;
	min-height: 100vh;
`;
