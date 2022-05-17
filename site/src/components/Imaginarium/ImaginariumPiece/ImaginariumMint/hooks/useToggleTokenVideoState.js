import { useContractFunction, useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { useEffect, useState } from "react";

export const useToggleTokenVideoState = ({ tokenId }) => {
	const { contract } = useChainConfig();
	const { account } = useEthers();
	const [error, setError] = useState(undefined);
	const [isToggling, setIsToggling] = useState(false);

	const { send, state } = useContractFunction(
		contract,
		"toggleTokenVideoState",
		{
			transactionName: "ToggleTokenVideoState",
		}
	);

	// handle successful mints
	useEffect(() => {
		if (
			state &&
			state.status !== "None" &&
			state.status !== "Success" &&
			state.status !== "Exception"
		) {
			setIsToggling(true);
		} else {
			setIsToggling(false);
		}
	}, [state, setIsToggling]);

	// handle mint error
	useEffect(() => {
		if (state && state.status === "Exception") {
			setError(state.errorMessage);
			setIsToggling(false);
		}
	}, [state]);

	const toggleTokenVideoState = async () => {
		setError(undefined);

		if (!account) {
			setError("No account connected");
			return;
		}

		try {
			await send(tokenId);
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
		toggleTokenVideoState,
		error,
		isToggling,
	};
};
