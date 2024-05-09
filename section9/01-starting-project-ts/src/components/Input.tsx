export default function Input({change, ...props}) {
    return <input {...props} onChange={change}></input>
}