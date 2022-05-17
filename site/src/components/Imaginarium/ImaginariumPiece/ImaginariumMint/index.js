import { useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumMint.styled";
import { useMint } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/hooks/useMint";
import { useToggleTokenVideoState } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/hooks/useToggleTokenVideoState";

export const ImaginariumMint = ({ nft, ownerOf, listPrice }) => {
	const { activateBrowserWallet, account } = useEthers();
	const {
		mint,
		error: mintError,
		isMinting,
	} = useMint({ tokenId: nft.tokenId, listPrice });
	const {
		toggleTokenVideoState,
		error: toggleError,
		isToggling,
	} = useToggleTokenVideoState({ tokenId: nft.tokenId });

	const { contract, openseaURL } = useChainConfig();

	return (
		<S.ImaginariumMint>
			{(() => {
				if (ownerOf && ownerOf === account) {
					return (
						<S.ImaginariumMintButton
							onClick={toggleTokenVideoState}
						>
							Toggle Video
						</S.ImaginariumMintButton>
					);
				}

				if (ownerOf && ownerOf !== account) {
					return (
						<S.ImaginariumMintLink
							href={`https://${openseaURL}.io/assets/${contract.address}/${nft.tokenId}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							View on Opensea
						</S.ImaginariumMintLink>
					);
				}

				if (!account) {
					return (
						<S.ImaginariumMintButton
							onClick={activateBrowserWallet}
						>
							Connect
						</S.ImaginariumMintButton>
					);
				}

				if (isMinting || isToggling) {
					return (
						<S.ImaginariumMintButton
							onClick={activateBrowserWallet}
						>
							<S.ImaginariumMintLoader />
						</S.ImaginariumMintButton>
					);
				}

				return (
					<S.ImaginariumMintButton onClick={mint}>
						Mint
					</S.ImaginariumMintButton>
				);
			})()}
			<S.ImaginariumMintError isActive={mintError || toggleError}>
				{JSON.stringify(mintError || toggleError)}
			</S.ImaginariumMintError>
		</S.ImaginariumMint>
	);
};
