const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const deployArguments = require("../arguments.lens-ladies");

chai.use(solidity);

const { expect } = chai;

describe("Greeter", function () {
	let LensLadies;
	let hardhatToken;
	let owner;
	let signers;

	beforeEach(async () => {
		LensLadies = await ethers.getContractFactory("LensLadies");
		[owner, ...signers] = await ethers.getSigners();

		hardhatToken = await LensLadies.deploy(...deployArguments);

		await hardhatToken.setArtistCut(ethers.utils.parseEther("0.017"));
		await hardhatToken.setListPrice(ethers.utils.parseEther("0.022"));
	});

	describe("Deployment", async () => {
		it("should set the right owner", async () => {
			const ownerAddress = await hardhatToken.owner();
			expect(ownerAddress).to.equal(owner.address);
		});
	});

	describe("Mint", async () => {
		it("should mint 9", async () => {
			await Promise.all(
				[...Array(9)].map(async (x, i) => {
					return await hardhatToken.mint(i, {
						value: ethers.utils.parseEther("0.022"),
					});
				})
			);

			expect(await hardhatToken.ownerOf(0)).to.be.equal(owner.address);
		});

		it("should not mint more than 9", async () => {
			await Promise.all(
				[...Array(9)].map(async (x, i) => {
					return await hardhatToken.mint(i, {
						value: ethers.utils.parseEther("0.022"),
					});
				})
			);

			await expect(
				hardhatToken.mint(9, {
					value: ethers.utils.parseEther("0.022"),
				})
			).to.be.revertedWith("TOKEN_ID_OUT_OF_BOUNDS");
		});

		it("can withdraw", async () => {
			// await hardhatToken.setSalesLimit(80);
			// const totalSupplyBefore = await hardhatToken.totalSupply();
			// expect(totalSupplyBefore).to.be.equal(0);
			// await Promise.all(
			// 	[...Array(69)].map(async (x, i) => {
			// 		return await hardhatToken.publicMint({
			// 			value: ethers.utils.parseEther("0.2"),
			// 		});
			// 	})
			// );
			// await Promise.all(
			// 	signers.slice(0, 11).map(async (signer) => {
			// 		await hardhatToken.connect(signer).publicMint({
			// 			value: ethers.utils.parseEther("0.2"),
			// 		});
			// 	})
			// );
			// const totalSupply = await hardhatToken.totalSupply();
			// expect(totalSupply).to.be.equal(80);
			// const balanceBefore = await ethers.provider.getBalance(
			// 	hardhatToken.address
			// );
			// expect(balanceBefore).to.be.equal(
			// 	ethers.BigNumber.from("16000000000000000000")
			// );
			// const ownerBalanceBefore = await ethers.provider.getBalance(
			// 	owner.address
			// );
			// await hardhatToken.withdraw();
			// const balanceAfter = await ethers.provider.getBalance(
			// 	hardhatToken.address
			// );
			// expect(balanceAfter).to.be.equal(ethers.BigNumber.from("0"));
			// const ownerBalanceAfter = await ethers.provider.getBalance(
			// 	owner.address
			// );
			// const devBalance = await ethers.provider.getBalance(
			// 	"0x35FB16Db88Bd1A37EFe58E4A936456c15065f713"
			// );
			// expect(devBalance).to.be.equal(
			// 	ethers.BigNumber.from("800000000000000000")
			// );
		});
	});

	describe("Metadata", async () => {
		it("should show all token ownres", async () => {
			const before = await hardhatToken.allTokenOwners();
			// await hardhatToken.mint(2, {
			// 	value: ethers.utils.parseEther("0.022"),
			// });
			await hardhatToken.connect(signers[0]).mint(2, {
				value: ethers.utils.parseEther("0.022"),
			});
			const after = await hardhatToken.allTokenOwners();

			expect(before[0].toString()).to.be.equal(
				"0x0000000000000000000000000000000000000000"
			);
			expect(after[2]).to.be.equal(signers[0].address);
		});
	});
});
