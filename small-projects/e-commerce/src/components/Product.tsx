import { FC, useContext, useState } from "react";

// Context
import { CartContext } from "@/store/shopping-cart-context";

// Types
import { IProduct } from "@/types";

interface Props {
	product: IProduct;
}

const ProductComponent: FC<Props> = ({ product }) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { addItemToCart } = useContext(CartContext);

	const handleLike = () => {
		setIsLiked(true);
	};

	return (
		<>
			<div className="shadow-xl transition-all  bg-white hover:scale-110 hover:z w-full sm:my-10">
				<div className="flex flex-col font-sans ">
					<div className="flex-none w-full relative h-60">
						<img src={product.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
					</div>
					<form className="flex-auto p-6">
						<div className="flex flex-wrap">
							<h1 className="flex-auto text-lg font-semibold text-slate-900">{product.title}</h1>
							<div className="text-lg font-semibold text-slate-500">{product.price} $</div>
							<div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">In stock</div>
						</div>
						<div className="flex space-x-4 mb-6 text-sm font-medium">
							<div className="flex-auto flex space-x-4">
								<button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button" onClick={() => addItemToCart(product.id)}>
									Add to Cart
								</button>
							</div>
							<button className={`flex-none flex items-center justify-center w-9 h-9 rounded-md  border  ${isLiked ? "border-blue-500 text-blue-600" : "border-slate-200 text-slate-300"}`} type="button" aria-label="Like" onClick={handleLike}>
								<svg width="20" height="20" fill="currentColor" aria-hidden="true">
									<path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
								</svg>
							</button>
						</div>
						<p className="text-sm text-slate-700">{product.description}</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default ProductComponent;
