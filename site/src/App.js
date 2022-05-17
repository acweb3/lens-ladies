import { Imaginarium } from "components/Imaginarium";
import { SiteWrapper } from "components/SiteWrapper";
import { Contexts } from "contexts";

export const App = () => {
	return (
		<Contexts>
			<SiteWrapper>
				<Imaginarium />
			</SiteWrapper>
		</Contexts>
	);
};
