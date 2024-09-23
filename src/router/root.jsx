import { createBrowserRouter } from "react-router-dom";

import { Main } from "../pages/lazyLoadPages"

const root = createBrowserRouter([
  {
    path: "",
    element: <Main />,
  },
]);

export default root;
