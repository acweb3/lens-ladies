import { DAppContext } from "contexts/DAppContext";
import { StyleContext } from "contexts/StyleContext";

export const Contexts = ({ children }) => {
	return (
		<StyleContext>
			<DAppContext>{children}</DAppContext>
		</StyleContext>
	);
};
