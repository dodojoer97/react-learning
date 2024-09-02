import Card from '../UI/Card';
import classes from './ProductItem.module.css';

// Store
import { useDispatch } from 'react-redux';
import { addItem, decreaseQuantity } from '../../store/index'; // Ensure the path is correct


const ProductItem = (props) => {
  const { title, price, description } = props;

  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({
      title: title,
      quantity: 1,
      price: price
    }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddItem}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
