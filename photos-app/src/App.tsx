import React from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import PhotoList from "./components/Main";

/* const Cart = React.lazy(
  // @ts-ignore
  () => import("CART/Cart")
); */

const categories = ["Anthro",
  "Artisan Crafts",
  "Cartoons & Comics",
  "Comedy",
  "Community Projects",
  "Contests",
  "Customization",
  "Designs & Interfaces",
  "Digital Art",
  "Fan Art",
  "Film & Animation",
  "Fractal Art",
  "Game Development Art",
  "Literature",
  "People",
  "Pets & Animals",
  "Photography",
  "Resources & Stock Images",
  "Science & Technology",
  "Sports",
  "Traditional Art"]
const props = {
  user: {
    firstName: "Max", lastName: "Goodwin",
  },
  data: { message: 'Greetings to all!', photos: ["https://picsum.photos/600/400", "https://picsum.photos/600/400", "https://picsum.photos/600/400"] },
  path: [],
  app: { settings: { categories } }
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
