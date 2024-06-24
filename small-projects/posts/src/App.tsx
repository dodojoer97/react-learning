import { useState, FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

// Components
import PostList from "@/components/PostList";
import Header from "@/components/Header";

const App: FC = () => {
	return (
		<>
			{/* <section>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</section>
			<h1>Vite + React</h1> */}
			<Header />
			<section className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5">
				<PostList />
			</section>
		</>
	);
};

export default App;
