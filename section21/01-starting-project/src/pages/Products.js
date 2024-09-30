
import { Link } from "react-router-dom"

function ProductsPage() {
	return (
		<>
			<h1>PRODUCTS</h1>
            <ul>
                <li>
                    <Link to="/product/1">product 1</Link>
                </li>
                <li>
                    <Link to="/product/2">product 2</Link>
                </li>
            </ul>
		</>
	)
}

export default ProductsPage
