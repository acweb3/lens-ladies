import { Imaginarium } from "components/Imaginarium";
import { SiteWrapper } from "components/SiteWrapper";
import { Contexts } from "contexts";
import "styles/theme.css";

const IndexPage = () => {
	return (
		<Contexts>
			<SiteWrapper>
				<Imaginarium />
			</SiteWrapper>
		</Contexts>
	);
};

export default IndexPage;
