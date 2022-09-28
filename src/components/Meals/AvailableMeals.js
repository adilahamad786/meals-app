import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
    {
        id : "m1",
        name : "Sushi",
        description : "Finest fish and veggies.",
        price : 22.99
    },
    {
        id : "m2",
        name : "Ommelate",
        description : "Chicken egg.",
        price : 5.19
    },
    {
        id : "m3",
        name : "Dal-Bati",
        description : "Indian food.",
        price : 25.49
    },
    {
        id : "m4",
        name : "Biryani",
        description : "Haydradbadi.",
        price : 15.99
    },
]

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>)
    return (
        <section className={classes.meals}>
            <ul>
                { mealsList }
            </ul>
        </section>
    );
}

export default AvailableMeals;