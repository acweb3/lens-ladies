const { config } = require("../config");

async function main() {
	const LensLadies = await hre.ethers.getContractFactory("LensLadies");
	const deploymentData = LensLadies.interface.encodeDeploy([
		config.ipfsURL,
		config.ipfsURL,
		[],
	]);
	const estimatedGas = await ethers.provider.estimateGas({
		data: deploymentData,
	});

	const lensLadies = await LensLadies.deploy(
		config.ipfsURL,
		config.ipfsURL,
		[]
	);

	await lensLadies.deployed();

	console.log("LensLadies deployed to:", lensLadies.address);
	console.log("estimated gas:", estimatedGas);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
