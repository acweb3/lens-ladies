import { useContractFunction, useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { utils } from "ethers";
import { useEffect, useState } from "react";

export const useMint = ({ tokenId }) => {
	const { contract } = useChainConfig();
	const { account } = useEthers();
	const [error, setError] = useState(undefined);
	const [isMinting, setIsMinting] = useState(false);

	const { send, state } = useContractFunction(contract, "mint", {
		transactionName: "Mint",
	});

	useEffect(() => {
		if (state && state.status !== "None" && state.status !== "Success") {
			setIsMinting(true);
		} else {
			setIsMinting(false);
		}
	}, [state, setIsMinting]);

	useEffect(() => {
		if (state && state.status === "Exception") {
			setError(state.errorMessage);
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
				value: utils.parseEther("0.022"),
			});
		} catch (e) {
			console.log(e);
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
