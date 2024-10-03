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
  {
    path: "newWorks",
    element: <newWorks />,
  },

  {
    path: "adminMain",
    element: <AdminMain />,
  },
]);

export default root;
