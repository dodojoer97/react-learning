import React from 'react';

interface Props {
    [x: string]: any; // This allows any additional string-indexed properties
    change: (event: React.ChangeEvent<HTMLInputElement>) => void; // More specific function type for change events
}

const Input: React.FC<Props> = ({ change, ...props }) => {
    return <input {...props} onChange={change} />;
}

export default Input; // This should match the name of the component