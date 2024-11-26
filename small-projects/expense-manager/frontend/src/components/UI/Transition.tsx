import React, { useRef, useEffect, useContext, ReactNode, ElementType } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

// Define the type for the TransitionContext
interface TransitionContextType {
	parent: {
		show?: boolean;
		appear?: boolean;
		isInitialRender?: boolean;
	};
}

// Create the TransitionContext with a default value
const TransitionContext = React.createContext<TransitionContextType>({
	parent: {},
});

// Hook to check if it's the initial render
function useIsInitialRender() {
	const isInitialRender = useRef(true);
	useEffect(() => {
		isInitialRender.current = false;
	}, []);
	return isInitialRender.current;
}

// Define props type for CSSTransition component
interface CSSTransitionProps {
	show: boolean;
	enter?: string;
	enterStart?: string;
	enterEnd?: string;
	leave?: string;
	leaveStart?: string;
	leaveEnd?: string;
	appear?: boolean;
	unmountOnExit?: boolean;
	tag?: ElementType;
	children?: ReactNode;
	[rest: string]: any; // Additional props
}

function CSSTransition({
	show,
	enter = "",
	enterStart = "",
	enterEnd = "",
	leave = "",
	leaveStart = "",
	leaveEnd = "",
	appear,
	unmountOnExit,
	tag = "div",
	children,
	...rest
}: CSSTransitionProps) {
	const enterClasses = enter.split(" ").filter((s) => s.length);
	const enterStartClasses = enterStart.split(" ").filter((s) => s.length);
	const enterEndClasses = enterEnd.split(" ").filter((s) => s.length);
	const leaveClasses = leave.split(" ").filter((s) => s.length);
	const leaveStartClasses = leaveStart.split(" ").filter((s) => s.length);
	const leaveEndClasses = leaveEnd.split(" ").filter((s) => s.length);
	const removeFromDom = unmountOnExit;

	function addClasses(node: HTMLElement, classes: string[]) {
		classes.length && node.classList.add(...classes);
	}

	function removeClasses(node: HTMLElement, classes: string[]) {
		classes.length && node.classList.remove(...classes);
	}

	const nodeRef = useRef<HTMLElement>(null);
	const Component = tag;

	return (
		<ReactCSSTransition
			appear={appear}
			nodeRef={nodeRef}
			unmountOnExit={removeFromDom}
			in={show}
			addEndListener={(done: EventListener) => {
				if (nodeRef.current) {
					nodeRef.current.addEventListener("transitionend", done, false);
				}
			}}
			onEnter={() => {
				if (nodeRef.current) {
					if (!removeFromDom) nodeRef.current.style.display = "";
					addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
				}
			}}
			onEntering={() => {
				if (nodeRef.current) {
					removeClasses(nodeRef.current, enterStartClasses);
					addClasses(nodeRef.current, enterEndClasses);
				}
			}}
			onEntered={() => {
				if (nodeRef.current) {
					removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
				}
			}}
			onExit={() => {
				if (nodeRef.current) {
					addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
				}
			}}
			onExiting={() => {
				if (nodeRef.current) {
					removeClasses(nodeRef.current, leaveStartClasses);
					addClasses(nodeRef.current, leaveEndClasses);
				}
			}}
			onExited={() => {
				if (nodeRef.current) {
					removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
					if (!removeFromDom) nodeRef.current.style.display = "none";
				}
			}}
		>
			<Component
				ref={nodeRef}
				{...rest}
				style={{ display: !removeFromDom ? "none" : undefined }}
			>
				{children}
			</Component>
		</ReactCSSTransition>
	);
}

// Define props type for Transition component
interface TransitionProps extends Omit<CSSTransitionProps, "show"> {
	show?: boolean;
}

function Transition({ show, appear, ...rest }: TransitionProps) {
	const { parent } = useContext(TransitionContext);
	const isInitialRender = useIsInitialRender();
	const isChild = show === undefined;

	if (isChild) {
		return (
			<CSSTransition
				appear={parent.appear || !parent.isInitialRender}
				show={parent.show!}
				{...rest}
			/>
		);
	}

	return (
		<TransitionContext.Provider
			value={{
				parent: {
					show,
					isInitialRender,
					appear,
				},
			}}
		>
			<CSSTransition appear={appear} show={show!} {...rest} />
		</TransitionContext.Provider>
	);
}

export default Transition;
