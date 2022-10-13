import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isCheckout, setIsCheckout] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(prevState => !prevState);
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map( item =>
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      )}
    </ul>
  );

  const modalActions = <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { isCheckout && <Checkout onCancel={orderHandler}/> }
      { !isCheckout &&  modalActions }
      
    </Modal>
  );
};

export default Cart;
