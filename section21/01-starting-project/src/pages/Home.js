import { Link, useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()
    
    function navigateHandler() {
        navigate("/products")
    }

    return <>
        <h1>Home page</h1>
        <p>Got to  <Link to="/products">products</Link></p>
        <p>
            <button onClick={navigateHandler}>test</button>
        </p>
    </>

}

export default HomePage