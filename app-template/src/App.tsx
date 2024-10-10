import React from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import PhotoList from "./components/PhotoList";

/* const Cart = React.lazy(
  // @ts-ignore
  () => import("CART/Cart")
); */

const props = {
  user: {
      firstName: "Max", lastName: "Goodwin",
  },
  data: { message: 'Greetings to all!', photos: ["https://picsum.photos/600/400", "https://picsum.photos/600/400", "https://picsum.photos/600/400"] }
}

export const App = () => {
  return (
    <div>
      <h1>Photos</h1>
      <PhotoList {...props} />
    </div>
  );
};

export default App;
