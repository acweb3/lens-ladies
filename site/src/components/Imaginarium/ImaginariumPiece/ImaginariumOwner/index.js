import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumOwner/ImaginariumOwner.styled";

export const ImaginariumOwner = ({ address }) => {
	const ens = useLookupAddress(address);
	const { account } = useEthers();

	return (
		<S.ImaginariumOwner hasOwner={Boolean(address)}>
			{(() => {
				if (account === address) {
					return <>owned by you</>;
				}

				if (address) {
					return <> owned by: {ens || shortenAddress(address)}</>;
				}

				return <>no owner</>;
			})()}
		</S.ImaginariumOwner>
	);
};
