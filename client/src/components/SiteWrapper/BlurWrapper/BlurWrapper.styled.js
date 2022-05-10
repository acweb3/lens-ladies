import styled, { css } from "styled-components";

export const BlurWrapperContent = styled.div`
	${(props) =>
		props.lock !== undefined &&
		css`
			filter: blur(6px);
			transform: translateY(-${props.lock}px);
			pointer-events: none;
		`};
`;

export const BlurWrapper = styled.div`
	${(props) =>
		props.lock !== undefined &&
		css`
			max-height: 100vh;
			overflow: hidden;
		`};
`;
