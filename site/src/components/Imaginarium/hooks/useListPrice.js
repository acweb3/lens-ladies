import { useCall } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { utils } from "ethers";

export const useListPrice = () => {
	const { contract } = useChainConfig();
	const listPriceCall = useCall({
		contract,
		method: "listPrice",
		args: [],
	});

	const listPrice = listPriceCall?.value?.[0] ?? undefined;

	return {
		listPrice: listPrice ? utils.formatEther(listPrice) : undefined,
	};
};
