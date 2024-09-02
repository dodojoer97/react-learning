import React from 'react';
import classes from './CartItem.module.css';


import { useDispatch } from 'react-redux';
import { addItem, decreaseQuantity } from '../../store/index'; // Ensure the path is correct

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;

  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({
      title: title,
      quantity: 1,
      price: price
    }));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(title)); // Assuming the reducer handles the logic based on the title
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecrease}>-</button>
          <button onClick={handleAddItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
