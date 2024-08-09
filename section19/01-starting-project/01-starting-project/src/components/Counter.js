// Redux
import { useSelector, useDispatch, connect } from "react-redux";

import { Component } from "react";

import classes from "./Counter.module.css";

import store from "../store";

// const Counter = () => {
// 	// Sets up a subscription to the store
// 	const counter = useSelector((state) => state.counter);
// 	const dispatch = useDispatch();

// 	const incrementHandler = () => {
// 		dispatch({ type: "increment" });
// 	};

// 	const decrementHandler = () => {
// 		dispatch({ type: "decrement" });
// 	};

// 	const toggleCounterHandler = () => {};

// 	return (
// 		<main className={classes.counter}>
// 			<h1>Redux Counter</h1>
// 			<div className={classes.value}>{counter}</div>
// 			<div>
// 				<button onClick={incrementHandler}>increment</button>
// 				<button onClick={decrementHandler}>decrement</button>
// 			</div>
// 			<button onClick={toggleCounterHandler}>Toggle Counter</button>
// 		</main>
// 	);
// };

class CounterCL extends Component {
	incrementHandler() {
		this.props.increment();
	}
	decrementHandler() {
		this.props.decrement();
	}
	toggleCounterHandler() {}
	render() {
		return (
			<main className={classes.counter}>
				<h1>Redux Counter</h1>
				<div className={classes.value}>{this.props.counter}</div>
				<div>
					<button onClick={this.incrementHandler.bind(this)}>increment</button>
					<button onClick={this.decrementHandler.bind(this)}>decrement</button>
				</div>
				<button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => dispatch({ type: "increment" }),
		decrement: () => dispatch({ type: "decrement" }),
	};
};

// export default Counter;
export default connect(mapStateToProps, mapDispatchToProps)(CounterCL);
