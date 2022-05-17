import { useCall } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";

export const useAllTokenOwners = () => {
	const { contract } = useChainConfig();
	const ownerOfCall = useCall({
		contract,
		method: "allTokenOwners",
		args: [],
	});
	const allTokenOwners = ownerOfCall?.value?.[0] ?? [];

	return {
		allTokenOwners,
	};
};
