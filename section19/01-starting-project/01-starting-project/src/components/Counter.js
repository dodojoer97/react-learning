// Redux
import { useSelector, useDispatch, connect } from "react-redux";

// import { Component } from "react";

import classes from "./Counter.module.css";

// import store from "../store";

// Slice
import { counterActions } from "../store/counter";

const Counter = () => {
	// Sets up a subscription to the store
	const counter = useSelector((state) => state.counter.counter);
	const showCounter = useSelector((state) => state.counter.showCounter);
	const dispatch = useDispatch();

	console.log("showCounter: ", showCounter);

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};

	const increaseHandler = () => {
		dispatch(counterActions.increase(10));
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggleCounter());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{showCounter && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>increment</button>
				<button onClick={decrementHandler}>decrement</button>
				<button onClick={increaseHandler}>increase</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

// class CounterCL extends Component {
// 	incrementHandler() {
// 		this.props.increment();
// 	}
// 	decrementHandler() {
// 		this.props.decrement();
// 	}
// 	toggleCounterHandler() {}
// 	render() {
// 		return (
// 			<main className={classes.counter}>
// 				<h1>Redux Counter</h1>
// 				<div className={classes.value}>{this.props.counter}</div>
// 				<div>
// 					<button onClick={this.incrementHandler.bind(this)}>increment</button>
// 					<button onClick={this.decrementHandler.bind(this)}>decrement</button>
// 				</div>
// 				<button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
// 			</main>
// 		);
// 	}
// }

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

export default Counter;
// export default connect(mapStateToProps, mapDispatchToProps)(CounterCL);
