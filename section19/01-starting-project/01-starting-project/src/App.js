import { Fragment } from "react";
import { useSelector } from "react-redux";

import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

function App() {
	const isAutheticated = useSelector((state) => state.auth.isAutheticated);
	return (
		<Fragment>
			<Header />
			{!isAutheticated && <Auth />}
			{isAutheticated && <UserProfile />}
			<Counter />
		</Fragment>
	);
}

export default App;
