import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies.",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Ommelate",
//     description: "Chicken egg.",
//     price: 5.19,
//   },
//   {
//     id: "m3",
//     name: "Dal-Bati",
//     description: "Indian food.",
//     price: 25.49,
//   },
//   {
//     id: "m4",
//     name: "Biryani",
//     description: "Haydradbadi.",
//     price: 15.99,
//   },
// ];

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://book-your-meals-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json")
      const responseData = await response.json();

      const loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id : key,
          name : responseData[key].name,
          description : responseData[key].description,
          price : responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    }
    
    fetchMeals();
  
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
