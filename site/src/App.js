import { MintModal } from "./components/MintModal";
import { Imaginarium } from "components/Imaginarium";
import { useModalViewContext } from "contexts/ModalViewContext";
import { useNFTMetadataContext } from "contexts/NFTMetadataContext";

export const App = () => {
	const { modalView } = useModalViewContext();
	const { nfts } = useNFTMetadataContext();

	return (
		<>
			{modalView && <MintModal nft={modalView} />}
			<Imaginarium nfts={nfts} />
		</>
	);
};
