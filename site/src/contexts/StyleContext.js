import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";

export const StyleContext = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
