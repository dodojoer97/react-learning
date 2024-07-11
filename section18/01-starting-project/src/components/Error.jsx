export default function Error({title, messsage}) {
    return <div className="error">
        <h2>{title}</h2>
        <p>{messsage}</p>
    </div>
}