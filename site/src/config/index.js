const requiredEnvVar = (name, envVar) => {
	if (!envVar) {
		throw new Error(`Environment variable ${name} missing`);
	}

	return envVar;
};

export const config = {
	rinkebyContractAddress: requiredEnvVar(
		"contractAddress",
		process.env.REACT_APP_CONTRACT_ADDRESS
	),
};
