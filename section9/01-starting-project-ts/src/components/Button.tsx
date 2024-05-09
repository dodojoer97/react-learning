interface Props {
    label: string,
    [x: string]: any
}

const Button: React.FC<Props> = ({label, ...props}) => {
    return <button {...props}>{label}</button>
}

export default Button
