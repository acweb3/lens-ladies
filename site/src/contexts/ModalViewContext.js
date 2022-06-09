import { createContext, useContext, useState } from "react";

const ModalView = createContext({});
export const useModalViewContext = () => useContext(ModalView);

export const ModalViewContext = ({ children }) => {
	const [modalView, setModalView] = useState(undefined);

	return (
		<ModalView.Provider value={{ modalView, setModalView }}>
			{children}
		</ModalView.Provider>
	);
};
