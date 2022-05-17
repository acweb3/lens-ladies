import { shortenAddress, useLookupAddress } from "@usedapp/core";

export const ImaginariumOwner = ({ address }) => {
	const ens = useLookupAddress(address);
	return <>{ens || shortenAddress(address)}</>;
};
