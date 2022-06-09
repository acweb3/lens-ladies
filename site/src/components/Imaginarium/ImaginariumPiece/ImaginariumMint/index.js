import { useEthers } from "@usedapp/core";
import { useChainConfig } from "common/hooks/useChainConfig";
import * as S from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/ImaginariumMint.styled";
import { useMint } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/hooks/useMint";
import { useToggleTokenVideoState } from "components/Imaginarium/ImaginariumPiece/ImaginariumMint/hooks/useToggleTokenVideoState";
import { BaseButton } from "components/ui/BaseButton";

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
						<BaseButton.BaseButton onClick={toggleTokenVideoState}>
							Toggle Video
						</BaseButton.BaseButton>
					);
				}

				if (ownerOf && ownerOf !== account) {
					return (
						<BaseButton.BaseLink
							href={`https://${openseaURL}.io/assets/${contract.address}/${nft.tokenId}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							View on Opensea
						</BaseButton.BaseLink>
					);
				}

				if (!account) {
					return (
						<BaseButton.BaseButton onClick={activateBrowserWallet}>
							Connect
						</BaseButton.BaseButton>
					);
				}

				if (isMinting || isToggling) {
					return (
						<BaseButton.BaseButton onClick={activateBrowserWallet}>
							<S.ImaginariumMintLoader />
						</BaseButton.BaseButton>
					);
				}

				return (
					<BaseButton.BaseButton onClick={mint}>
						Mint
					</BaseButton.BaseButton>
				);
			})()}
			<S.ImaginariumMintError isActive={mintError || toggleError}>
				{JSON.stringify(mintError || toggleError)}
			</S.ImaginariumMintError>
		</S.ImaginariumMint>
	);
};
