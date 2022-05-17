import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumOwner/ImaginariumOwner.styled";

export const ImaginariumOwner = ({ address }) => {
	const ens = useLookupAddress(address);
	const { account } = useEthers();

	return (
		<S.ImaginariumOwner>
			{(() => {
				if (account === address) {
					return <>owned by you</>;
				}

				return <> owned by: {ens || shortenAddress(address)}</>;
			})()}
		</S.ImaginariumOwner>
	);
};
