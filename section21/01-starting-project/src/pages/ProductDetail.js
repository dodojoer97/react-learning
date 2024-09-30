import { useParams } from "react-router-dom"


function ProductDetailPage() {
    const params = useParams()

    const id = params.productId

    return <h1>Product details: {id}</h1>
}

export default ProductDetailPage