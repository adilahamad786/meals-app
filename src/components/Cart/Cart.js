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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(prevState => !prevState);
  }

  const submitOrderedHandler = (userInfo) => {
    setIsSubmitting(true);

    fetch("https://book-your-meals-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", {
      method : "POST",
      body : JSON.stringify({
        userInfo : userInfo,
        orderedItems : cartCtx.items
      })
    })

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clear();
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

  const cartModalContent = (<>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { isCheckout && <Checkout onConfirm={submitOrderedHandler} onCancel={orderHandler}/> }
      { !isCheckout &&  modalActions } 
  </>);

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmittingModalContent = (<>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHideCart}>Close</button>
    </div>
  </>);

  return (
    <Modal onHideCart={props.onHideCart}>
       { !isSubmitting && !didSubmit && cartModalContent }
       { isSubmitting && isSubmittingModalContent }
       { !isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
