import { ChainId, DAppProvider } from "@usedapp/core";

const config = {
	readOnlyChainId: ChainId.Rinkeby,
	readOnlyUrls: {
		[ChainId.Rinkeby]:
			"https://eth-rinkeby.alchemyapi.io/v2/jKXV4sfwY85HRiEpFxlduW2DL5uBdo3a",
	},
};

export const DAppContext = ({ children }) => {
	return <DAppProvider config={config}>{children}</DAppProvider>;
};
