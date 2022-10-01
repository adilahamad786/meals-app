import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = useContext(CartContext);
    
    const numberOfCartItems = items.reduce((curAmount, item) => {
        return curAmount + item.amount;
    }, 0)

    const bunClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump : "" }`;

    useEffect(() => {
        if (items.length === 0)
            return;
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={bunClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span> Your Cart </span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;