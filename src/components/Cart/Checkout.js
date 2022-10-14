import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name : true,
        street : true,
        postalCode : true,
        city : true
    });

    const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const isEmpty = value => value.trim() !== '';
        const isFiveChars = value => value.trim().length === 5;

        const enteredNameIsValid = isEmpty(enteredName);
        const enteredStreetIsValid = isEmpty(enteredStreet);
        const enteredCityIsValid = isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            city : enteredCityIsValid,
            postalCode : enteredPostalCodeIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid; 

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            city : enteredCity,
            postalCode : enteredPostalCode
        });
    }

    const nameContorlClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`
    const streetContorlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`
    const postalCodeContorlClasses = `${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`
    const cityContorlClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameContorlClasses} >
                <label htmlFor="name">User Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                { !formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetContorlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                { !formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeContorlClasses}>
                <label htmlFor="postal">Postal code</label>
                <input type="text" id="postal" ref={postalCodeInputRef} />
                { !formInputsValidity.postalCode && <p>Please enter a valid PostalCode!</p>}
            </div>
            <div className={cityContorlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                { !formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;