import React from 'react';

interface Props {
    [x: string]: any
}

const Form: React.FC<Props> = ({...props}) => {
    return <form {...props}>
        
    </form>
}

export default Form