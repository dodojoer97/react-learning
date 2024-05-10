interface Props {
	[x: string]: any;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
	return <button {...props}>{children}</button>;
};

export default Button;
