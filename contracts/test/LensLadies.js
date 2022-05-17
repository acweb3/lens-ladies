const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const deployArguments = require("../arguments.lens-ladies");

chai.use(solidity);

const { expect } = chai;

const [imageIPFSURI, videoIFPSURI, artistAddresses] = deployArguments;

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

		it("should mint reserve", async () => {
			await hardhatToken.addReserve(
				4,
				ethers.utils.parseEther("0.017"),
				signers[0].address
			);

			await expect(
				hardhatToken.mint(4, {
					value: ethers.utils.parseEther("0.22"),
				})
			).to.be.revertedWith("TOKEN_RESERVED");

			await hardhatToken.connect(signers[0]).mint(4, {
				value: ethers.utils.parseEther("0.17"),
			});

			expect(await hardhatToken.ownerOf(4)).to.be.equal(
				signers[0].address
			);
		});

		it("should not reserve below artistCut", async () => {
			await expect(
				hardhatToken.addReserve(
					4,
					ethers.utils.parseEther("0.01"),
					signers[0].address
				)
			).to.be.revertedWith("ARTIST_CUT_NOT_MET");
		});
	});

	describe("Funds", async () => {
		it("can withdraw", async () => {
			await Promise.all(
				signers.slice(0, 9).map(async (x, i) => {
					return await hardhatToken.mint(i, {
						value: ethers.utils.parseEther("0.022"),
					});
				})
			);

			const beforeBalance = await ethers.provider.getBalance(
				owner.address
			);

			const tx = await hardhatToken.withdraw();
			const receipt = await tx.wait();
			const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

			await Promise.all(
				artistAddresses.map(async (artistAddress) => {
					expect(
						await ethers.provider.getBalance(artistAddress)
					).to.be.equal(ethers.utils.parseEther("0.017"));
				})
			);

			expect(
				await ethers.provider.getBalance(
					"0x4B0b14d91D325981873703025ab055C3645521b7"
				)
			).to.be.equal(ethers.utils.parseEther("0.00225"));

			const afterBalance = await ethers.provider.getBalance(
				owner.address
			);

			expect(afterBalance.sub(beforeBalance).add(gasUsed)).to.be.equal(
				ethers.utils.parseEther("0.04275")
			);

			expect(
				await ethers.provider.getBalance(hardhatToken.address)
			).to.be.equal(ethers.utils.parseEther("0"));
		});

		it("can withdraw with reserve", async () => {
			await hardhatToken.addReserve(
				0,
				ethers.utils.parseEther("0.017"),
				signers[0].address
			);

			await hardhatToken.connect(signers[0]).mint(0, {
				value: ethers.utils.parseEther("0.017"),
			});

			await Promise.all(
				signers.slice(1, 9).map(async (x, i) => {
					return await hardhatToken.mint(i + 1, {
						value: ethers.utils.parseEther("0.022"),
					});
				})
			);

			const beforeBalance = await ethers.provider.getBalance(
				owner.address
			);

			const tx = await hardhatToken.withdraw();
			const receipt = await tx.wait();
			const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

			const balances = await Promise.all(
				artistAddresses.map(async (artistAddress) => {
					const artistBalance = await ethers.provider.getBalance(
						artistAddress
					);
					expect(artistBalance).to.be.equal(
						ethers.utils.parseEther("0.034")
					);

					return artistBalance;
				})
			);

			expect(
				await ethers.provider.getBalance(
					"0x4B0b14d91D325981873703025ab055C3645521b7"
				)
			).to.be.equal(ethers.utils.parseEther("0.00425"));

			const afterBalance = await ethers.provider.getBalance(
				owner.address
			);

			expect(afterBalance.sub(beforeBalance).add(gasUsed)).to.be.equal(
				ethers.utils.parseEther("0.038")
			);

			expect(
				await ethers.provider.getBalance(hardhatToken.address)
			).to.be.equal(ethers.utils.parseEther("0"));
		});
	});

	describe("Metadata", async () => {
		it("should show all token owners", async () => {
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

		it("correctly toggles video state", async () => {
			await hardhatToken.connect(signers[0]).mint(2, {
				value: ethers.utils.parseEther("0.022"),
			});

			expect(await hardhatToken.tokenURI(2)).to.be.equal(
				`${videoIFPSURI}${2}`
			);

			await hardhatToken.connect(signers[0]).toggleTokenVideoState(2);

			expect(await hardhatToken.tokenURI(2)).to.be.equal(
				`${imageIPFSURI}${2}`
			);

			await hardhatToken.connect(signers[0]).toggleTokenVideoState(2);

			expect(await hardhatToken.tokenURI(2)).to.be.equal(
				`${videoIFPSURI}${2}`
			);
		});
	});
});
