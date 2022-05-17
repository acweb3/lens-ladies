import { useContractFunction, useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { utils } from "ethers";
import { useEffect, useState } from "react";

export const useMint = ({ tokenId, listPrice }) => {
	const { contract } = useChainConfig();
	const { account } = useEthers();
	const [error, setError] = useState(undefined);
	const [isMinting, setIsMinting] = useState(false);

	const { send, state } = useContractFunction(contract, "mint", {
		transactionName: "Mint",
	});

	// handle successful mints
	useEffect(() => {
		if (
			state &&
			state.status !== "None" &&
			state.status !== "Success" &&
			state.status !== "Exception"
		) {
			setIsMinting(true);
		} else {
			setIsMinting(false);
		}
	}, [state, setIsMinting]);

	// handle mint error
	useEffect(() => {
		if (state && state.status === "Exception") {
			setError(state.errorMessage);
			setIsMinting(false);
		}
	}, [state]);

	const mint = async () => {
		setError(undefined);

		if (!account) {
			setError("No account connected");
			return;
		}

		try {
			await send(tokenId, {
				value: utils.parseEther(listPrice),
			});
		} catch (e) {
			console.error(e);
			if (e?.code === 4001) {
				setError("User denied transaction signature");
			} else if (e.code && e.message.includes("execution reverted")) {
				const reason = e.message
					.split("execution reverted: ")?.[1]
					.split(",")[0];

				setError(reason ?? "Error");
			} else {
				setError(e);
			}
		}
	};

	return {
		mint,
		error,
		isMinting,
	};
};
