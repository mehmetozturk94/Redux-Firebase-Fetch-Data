import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartQuantitiy = useSelector(state => state.cart.totalQuantity)

  const cartBtnHandler=()=>{
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={cartBtnHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantitiy}</span>
    </button>
  );
};

export default CartButton;
