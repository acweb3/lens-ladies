import { ChainId, DAppProvider } from "@usedapp/core";
import { config } from "config";

const rinkebyConfig = {
	readOnlyChainId: ChainId.Rinkeby,
	readOnlyUrls: {
		[ChainId.Rinkeby]: config.rinkebyAlchemyURL,
	},
};

const mainnetConfig = {
	readOnlyChainId: ChainId.Mainnet,
	readOnlyUrls: {
		[ChainId.Mainnet]: config.mainnetAlchemyURL,
	},
};

export const DAppContext = ({ children }) => {
	return (
		<DAppProvider
			config={
				process.env.NODE_ENV === "development"
					? rinkebyConfig
					: mainnetConfig
			}
		>
			{children}
		</DAppProvider>
	);
};
