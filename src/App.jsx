import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import "./App.css";
import { Suspense } from "react";
import Loading from "./components/commons/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={root} />
    </Suspense>
  );
}

export default App;
