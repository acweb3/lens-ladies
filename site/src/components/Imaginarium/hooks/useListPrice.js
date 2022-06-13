import { useCall, useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { listPriceAllowList } from "components/Imaginarium/hooks/listPriceAllowList";
import { utils } from "ethers";

export const useListPrice = () => {
	const { account } = useEthers();
	const { contract } = useChainConfig();
	const listPriceCall = useCall({
		contract,
		method: "listPrice",
		args: [],
	});

	const listPrice = listPriceCall?.value?.[0] ?? undefined;

	if (
		listPrice &&
		account &&
		listPriceAllowList.includes(account.toLowerCase())
	) {
		return {
			listPrice: utils.formatEther(listPrice),
		};
	}

	if (listPrice) {
		return {
			listPrice: "2.2",
		};
	}

	return {
		listPrice: undefined,
	};
};
