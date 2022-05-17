const { config } = require("../config");
const deployArguments = require("../arguments.lens-ladies");

async function main() {
	const LensLadies = await hre.ethers.getContractFactory("LensLadies");
	const deploymentData = LensLadies.interface.encodeDeploy([
		...deployArguments,
	]);
	const estimatedGas = await ethers.provider.estimateGas({
		data: deploymentData,
	});

	const lensLadies = await LensLadies.deploy(...deployArguments);

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
