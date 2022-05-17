const requiredEnvVar = (name, envVar) => {
	if (!envVar) {
		throw new Error(`Environment variable ${name} missing`);
	}

	return envVar;
};

export const config = {
	contractAddress: requiredEnvVar(
		"contractAddress",
		process.env.REACT_APP_CONTRACT_ADDRESS
	),
	rinkebyAlchemyURL: requiredEnvVar(
		"rinkebyAlchemyURL",
		process.env.REACT_APP_RINKEBY_ALCHEMY_URL
	),
	mainnetAlchemyURL: requiredEnvVar(
		"mainnetAlchemyURL",
		process.env.REACT_APP_MAINNET_ALCHEMY_URL
	),
};
