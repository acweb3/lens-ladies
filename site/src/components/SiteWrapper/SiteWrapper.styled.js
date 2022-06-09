import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: wix3, sans-serif;
        color: ${(props) => props.theme.colors.white[0]};
        max-width: 100vw;
    }
`;

export const Main = styled.main`
	position: relative;
	min-height: 100vh;
`;
