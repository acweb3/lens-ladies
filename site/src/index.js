import { App } from "./App";
import { SiteWrapper } from "components/SiteWrapper";
import { Contexts } from "contexts";
import React from "react";
import ReactDOM from "react-dom/client";
import "styles/theme.css";
import "styles/typography.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Contexts>
			<SiteWrapper>
				<App />
			</SiteWrapper>
		</Contexts>
	</React.StrictMode>
);
