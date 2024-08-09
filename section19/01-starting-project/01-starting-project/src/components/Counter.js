import classes from "./Counter.module.css";

// Redux
import { useSelector, connect } from "react-redux";

import store from "../store";

const Counter = () => {
	// Sets up a subscription to the store
	const counter = useSelector((state) => state.counter);

	const toggleCounterHandler = () => {
		store.dispatch({ type: "increment" });
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			<div className={classes.value}>{counter}</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
