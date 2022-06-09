import { DAppContext } from "contexts/DAppContext";
import { ModalViewContext } from "contexts/ModalViewContext";
import { NFTMetadataContext } from "contexts/NFTMetadataContext";
import { StyleContext } from "contexts/StyleContext";
import { TokenOwnersContext } from "contexts/TokenOwnersContext";

export const Contexts = ({ children }) => {
	return (
		<StyleContext>
			<DAppContext>
				<NFTMetadataContext>
					<TokenOwnersContext>
						<ModalViewContext>{children}</ModalViewContext>
					</TokenOwnersContext>
				</NFTMetadataContext>
			</DAppContext>
		</StyleContext>
	);
};
