import { Link } from "react-router-dom"

function homePage() {
    return <>
        <h1>Home page</h1>
        <p>Got to  <Link to="/products">products</Link></p>
    </>

}

export default homePage