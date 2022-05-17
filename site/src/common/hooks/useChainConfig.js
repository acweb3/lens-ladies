import abi from "./abi.json";
import { useEthers } from "@usedapp/core";
import { config } from "config";
import { Contract } from "ethers";

export const useChainConfig = () => {
	const ethers = useEthers();

	// # TODO => Add a thing for mainnet
	const contractAddress =
		ethers.library?.network?.chainId === 4
			? config.rinkebyContractAddress
			: config.rinkebyContractAddress;

	return {
		contract: new Contract(contractAddress, abi),
		openseaURL:
			ethers.library?.network?.chainId === 4
				? "testnets.opensea"
				: "opensea",
	};
};
