import { Container } from "react-bootstrap";
import MainNav from "./MainNav";

const Layout = (props) => {
	return (
		<>
			<MainNav />
			<br />
			<Container>{props.children}</Container>
			<br />
		</>
	);
};

export default Layout;
