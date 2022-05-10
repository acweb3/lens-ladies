// import * as S from "components/SiteWrapper/BlurWrapper/BlurWrapper.styled";
// import { useActiveRecentWorkContext } from "contexts/ActiveRecentWorkContext";
// import React, { useEffect, useRef, useState } from "react";

// export const BlurWrapper = ({ children }) => {
// 	const { activeRecentWork } = useActiveRecentWorkContext();
// 	const [lock, setLock] = useState();
// 	const lockRef = useRef();

// 	useEffect(() => {
// 		if (activeRecentWork !== undefined) {
// 			setLock(window.scrollY);
// 			lockRef.current = window.scrollY;
// 		} else {
// 			setLock(undefined);
// 		}
// 	}, [activeRecentWork]);

// 	useEffect(() => {
// 		if (!lock && lockRef.current) {
// 			window.scrollTo({ top: lockRef.current });
// 			lockRef.current = undefined;
// 		}
// 	}, [lock]);

// 	return (
// 		<S.BlurWrapper lock={lock}>
// 			<S.BlurWrapperContent lock={lock}>{children}</S.BlurWrapperContent>
// 		</S.BlurWrapper>
// 	);
// };

export const BlurWrapper = ({ children }) => <>{children}</>;
