import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg"

const Header = (props) => {
    return (
        <>
            <header className={ classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious meals!" />
            </div>
        </>
    );
}

export default Header;