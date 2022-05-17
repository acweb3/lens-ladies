const { expect } = require("chai");
const { ethers } = require("hardhat");
const { config } = require("../config");

describe("Greeter", function () {
	let LensLadies;
	let hardhatToken;
	let owner;
	let signers;

	beforeEach(async () => {
		LensLadies = await ethers.getContractFactory("LensLadies");
		[owner, ...signers] = await ethers.getSigners();

		hardhatToken = await LensLadies.deploy(
			config.ipfsURL,
			config.ipfsURL,
			[]
		);

		await hardhatToken.setListPrice(ethers.utils.parseEther("0.02"));
	});

	describe("Metadata", async () => {
		it("should show all token ownres", async () => {
			const before = await hardhatToken.allTokenOwners();
			await hardhatToken.mint(2, {
				value: ethers.utils.parseEther("0.02"),
			});
			const after = await hardhatToken.allTokenOwners();

			console.log({
				before,
				after,
			});
		});
	});
});
