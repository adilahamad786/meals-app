import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {

  const [cartIsShown, setCardIsShown] = useState(false);

  const showCartHandler = () => {
    setCardIsShown(true);
  }

  const hideCartHandler = () => {
    setCardIsShown(false);
  }

  return (
    <>
      { cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
