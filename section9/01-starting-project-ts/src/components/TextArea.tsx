import React from "react"

interface Props {
    [x: string]: any
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({...props}) => {
    return <textarea {...props}></textarea>
}

export default TextArea