//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Reserve {
	uint256 updatedPrice;
	address reserverAddress;
}

contract LensLadies is ERC721, Ownable {
	string imageBaseURI;
	string videoBaseURI;
	address sweetAndy = 0x4B0b14d91D325981873703025ab055C3645521b7;
	uint256 listPrice = 2200000000000000000;
	uint256 artistCut = 1700000000000000000;
	uint256 tokenLimit = 9;
	uint256[] private pastSales; // list of past sales
	mapping(uint256 => Reserve) reserveMapping; // mapping of reserves
	mapping(uint256 => address) artistTokenMap; // which artist made which token
	mapping(uint256 => bool) isImageMapping;

	/**
	 * Set up ERC721 contract
	 * @param imageBaseURI_ base uri for tokens
	 * @param artistAddresses artist addresses in token order
	 */
	constructor(
		string memory imageBaseURI_,
		string memory videoBaseURI_,
		address[] memory artistAddresses
	) ERC721("LensLadies", "LensLady") {
		imageBaseURI = imageBaseURI_;
		videoBaseURI = videoBaseURI_;

		// Set artist royalty key value map
		for (uint128 i = 0; i < artistAddresses.length; i++) {
			artistTokenMap[i] = artistAddresses[i];
		}
	}

	/*--------------------------*/
	/// Setters
	/*--------------------------*/

	/**
	 * @notice update the token limit
	 * @param tokenLimit_ new token limit
	 */
	function setTokenLimit(uint256 tokenLimit_) public onlyOwner {
		tokenLimit = tokenLimit_;
	}

	/**
	 * @notice update base uri for images
	 * @param imageBaseURI_ base uri to update images
	 */
	function setImageBaseURI(string memory imageBaseURI_) public onlyOwner {
		imageBaseURI = imageBaseURI_;
	}

	/**
	 * @notice update base uri for videos
	 * @param videoBaseURI_ base uri to update videos
	 */
	function setVideoBaseURI(string memory videoBaseURI_) public onlyOwner {
		videoBaseURI = videoBaseURI_;
	}

	/**
	 * @notice update list price
	 * @param listPrice_ list price to update to
	 */
	function setListPrice(uint256 listPrice_) public onlyOwner {
		listPrice = listPrice_;
	}

	/**
	 * @notice update artist cut
	 * @param artistCut_ artist cut to update to
	 */
	function setArtistCut(uint256 artistCut_) public onlyOwner {
		artistCut = artistCut_;
	}

	/*--------------------------*/
	/// Token URI state
	/*--------------------------*/

	/**
	 * @notice toggle video state
	 * @param tokenId video to flip into image or video
	 */
	function toggleTokenVideoState(uint256 tokenId) public {
		require(msg.sender == ownerOf(tokenId), "NOT_OWNER");

		isImageMapping[tokenId] = !isImageMapping[tokenId];
	}

	/**
	 * @notice get uri for token, if it's in an image state return that uri
	 * otherwise serve the video.
	 * @param tokenId token to get URI for
	 * @return {string} tokenURI
	 */
	function tokenURI(uint256 tokenId)
		public
		view
		override
		returns (string memory)
	{
		require(_exists(tokenId), "TOKEN_DNE");

		string memory uri = isImageMapping[tokenId]
			? imageBaseURI
			: videoBaseURI;

		return string(abi.encodePacked(uri, Strings.toString(tokenId)));
	}

	/*--------------------------*/
	/// Mint mechanics
	/*--------------------------*/

	/**
	 * @notice update price for a specific piece
	 * @param tokenId token id to add reserve
	 * @param updatedPrice price that token will be sold at
	 * @param reserverAddress address of reserver
	 */
	function addReserve(
		uint256 tokenId,
		uint256 updatedPrice,
		address reserverAddress
	) public onlyOwner {
		/// @dev minimum price is 1.8 eth
		require(updatedPrice >= 1800000000000000000, "LOW_ETH");
		reserveMapping[tokenId] = Reserve({
			updatedPrice: updatedPrice,
			reserverAddress: reserverAddress
		});
	}

	/**
	 * @notice update price for a specific piece
	 * @param tokenId token id to remove reserve
	 */
	function removeReserve(uint256 tokenId) public onlyOwner {
		reserveMapping[tokenId] = Reserve(0, address(0));
	}

	/**
	 * @notice mint a token, checking for reserve
	 * @param tokenId token id to mint
	 */
	function mint(uint256 tokenId) public payable {
		/// @notice check for reserve and eth price before minting
		require(
			listPrice <= msg.value ||
				(reserveMapping[tokenId].reserverAddress == msg.sender &&
					reserveMapping[tokenId].updatedPrice <= msg.value),
			"LOW_ETH"
		);
		require(tokenId < tokenLimit, "TOKEN_ID_OUT_OF_BOUNDS");

		/// @notice add a past sale for iterating through on withdrawal
		pastSales.push(tokenId);
		_safeMint(msg.sender, tokenId);
	}

	/*--------------------------*/
	/// payout
	/*--------------------------*/

	/**
	 * @notice withdraw balance, cutting each artist with a sale 1.7 eth
	 */
	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;

		require(
			balance > pastSales.length * artistCut,
			"INSUFFICIENT_BALANCE_FOR_ARTIST"
		);

		// Pass collaborators their cut
		for (uint256 i = 0; i < pastSales.length; i++) {
			// # TODO => add a check here to make sure there is at least artistCut
			// to cover balance
			balance = balance - artistCut;

			address artistAddress = artistTokenMap[pastSales[i]];
			(bool artistSuccess, ) = artistAddress.call{ value: artistCut }("");
			require(artistSuccess, "FAILED_SEND_ARTIST");
		}

		delete pastSales;

		// Send devs remaining 5%
		(bool success, ) = sweetAndy.call{ value: (balance * 5) / 100 }("");
		require(success, "FAILED_SEND_DEV");

		// Send owner remainder of balance
		(success, ) = owner().call{ value: (balance * 95) / 100 }("");
		require(success, "FAILED_SEND_OWNER");
	}

	/*--------------------------*/
	/// owners
	/*--------------------------*/

	/**
	 * @notice retrive list of all token owners
	 * @return {address[]} sequential list of addresses per token id, with address(0)
	 * allocated for unclaimed tokens.
	 */
	function allTokenOwners() external view returns (address[] memory) {
		address[] memory tokenOwners = new address[](tokenLimit);

		for (uint256 i = 0; i < tokenLimit; i++) {
			tokenOwners[i] = _exists(i) ? ownerOf(i) : address(0);
		}

		return tokenOwners;
	}
}
