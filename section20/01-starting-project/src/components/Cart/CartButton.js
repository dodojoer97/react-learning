import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../store/index'; // Adjust the path as needed

const CartButton = (props) => {

  const dispatch = useDispatch(); // Make sure this line is included

    // Access the number of items in the cart from the Redux state
    const cartItemCount = useSelector((state) => {
      return state.items.length
    });
  
    // Function to handle the button click and toggle the cart
    const toggleCartHandler = () => {
      dispatch(toggleCart());
    };
  
  
    return (
      <button className={classes.button} onClick={toggleCartHandler}>
        <span>My Cart</span>
        <span className={classes.badge}>{cartItemCount}</span>
      </button>
    );
};

export default CartButton;
