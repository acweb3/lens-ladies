import { useCall } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import { createContext, useContext } from "react";

const TokenOwners = createContext({});
export const useTokenOwnersContext = () => useContext(TokenOwners);

export const TokenOwnersContext = ({ children }) => {
	const { contract } = useChainConfig();
	const ownerOfCall = useCall({
		contract,
		method: "allTokenOwners",
		args: [],
	});
	const allTokenOwners = ownerOfCall?.value?.[0] ?? [];

	return (
		<TokenOwners.Provider value={{ allTokenOwners }}>
			{children}
		</TokenOwners.Provider>
	);
};
