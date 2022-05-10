import { BlurWrapper } from "components/SiteWrapper/BlurWrapper";
import * as S from "components/SiteWrapper/SiteWrapper.styled";
import React from "react";
import { Helmet } from "react-helmet";

export const SiteWrapper = ({ children }) => {
	return (
		<>
			<Helmet>
				{/** # TODO => more metadata */}
				<meta charSet="utf-8" />
				<title>Ladies of the Lens</title>
			</Helmet>
			<S.Global />
			<BlurWrapper>
				<S.Main>{children}</S.Main>
			</BlurWrapper>
			{/** #TODO => Side panel goes here */}
		</>
	);
};
