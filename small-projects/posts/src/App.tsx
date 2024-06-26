import { FC } from "react";

// CSS
import "./App.css";

// Components
import PostList from "@/components/PostList";
import Header from "@/components/Header";

const App: FC = () => {
	return (
		<>
			<Header />
			<section className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5">
				<PostList />
			</section>
		</>
	);
};

export default App;
