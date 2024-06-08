import { FC } from "react";

// Components
import Header from "@/components/Header";
import PostList from "@/components/PostList";

// CSS
import "./App.css";

const App: FC = () => {
	return (
		<>
			<Header />
			<div className="container mx-auto mt-5">
				<PostList />
			</div>
		</>
	);
};
export default App;
