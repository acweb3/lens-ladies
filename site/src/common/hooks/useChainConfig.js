import abi from "./abi.json";
import { useEthers } from "@usedapp/core";
import { config } from "config";
import { Contract } from "ethers";

export const useChainConfig = () => {
	const ethers = useEthers();

	return {
		contract: new Contract(config.contractAddress, abi),
		openseaURL:
			ethers.library?.network?.chainId === 4
				? "testnets.opensea"
				: "opensea",
	};
};
