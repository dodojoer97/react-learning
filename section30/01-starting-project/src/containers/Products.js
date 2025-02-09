import React, {useContext} from 'react';

import ProductItem from '../components/Products/ProductItem';
import {ProductsContext} from "../context/products-context"
import './Products.css';

const Products = () => {
  const { products } = useContext(ProductsContext);
  return (
    <ul className="products-list">
      {products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
