import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedCartItems;

    if (existingCartItem.amount === 1) {
      updatedCartItems = state.items.filter(
        item => item.id !== action.id
      );
    } else {
        const updatedCartItem = {...existingCartItem, amount : existingCartItem.amount-1};
        updatedCartItems = [...state.items];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

    return {items : updatedCartItems, totalAmount : updatedTotalAmount};
  }

  if (action.type === "CLEAR"){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clear = () => {
    dispatchCartAction({type : "CLEAR"});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clear : clear
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
