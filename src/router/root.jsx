import { createBrowserRouter } from "react-router-dom";

import {
  Login,
  Find,
  AdminMain,
  WorkerMain,
  ResearchMain,
  CleaningMain,
  CollectingMain,
} from "../pages/lazyLoadPages.js";

const root = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "findPassword",
    element: <Find />,
  },
  {
    path: "adminMain",
    element: <AdminMain />,
  },
  {
    path: "workerMain",
    element: <WorkerMain />,
  },
  {
    path: "researchMain",
    element: <ResearchMain />,
  },
  {
    path: "cleaningMain",
    element: <CleaningMain />,
  },
  {
    path: "collectingMain",
    element: <CollectingMain />,
  },
]);

export default root;
