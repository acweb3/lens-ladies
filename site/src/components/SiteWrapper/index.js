import * as S from "components/SiteWrapper/SiteWrapper.styled";
import React from "react";

export const SiteWrapper = ({ children }) => {
	return (
		<>
			<S.Global />
			<S.Main>{children}</S.Main>
			{/** #TODO => Side panel goes here */}
		</>
	);
};
