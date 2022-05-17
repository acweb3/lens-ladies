import { useMint } from "./hooks/useMint";
import { useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumMint.styled";
import { ImaginariumOwner } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumOwner";

export const ImaginariumMint = ({ nft, ownerOf }) => {
	const { activateBrowserWallet, account } = useEthers();
	const { mint, error, isMinting } = useMint({ tokenId: nft.tokenId });
	const { contract, openseaURL } = useChainConfig();

	return (
		<S.ImaginariumMint>
			{(() => {
				if (!account) {
					return (
						<S.ImaginariumMintButton
							onClick={activateBrowserWallet}
						>
							Connect
						</S.ImaginariumMintButton>
					);
				}

				if (isMinting) {
					return (
						<S.ImaginariumMintButton
							onClick={activateBrowserWallet}
						>
							<S.ImaginariumMintLoader />
						</S.ImaginariumMintButton>
					);
				}

				if (ownerOf) {
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

				return (
					<S.ImaginariumMintButton onClick={mint}>
						Mint
					</S.ImaginariumMintButton>
				);
			})()}
			{error && (
				<S.ImaginariumMintError>
					{JSON.stringify(error)}
				</S.ImaginariumMintError>
			)}
		</S.ImaginariumMint>
	);
};
