import { createBrowserRouter } from "react-router-dom";

import {
  Login,
  Find,
  AdminMain,
  WorkerMain,
  ResearchMain,
  CleaningMain,
  PickUpMain,
  CollectingMain,
  BasicStatistics,
  MainTrashDistributionChart,
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
    path: "pickUpMain",
    element: <PickUpMain />,
  },
  {
    path: "collectingMain",
    element: <CollectingMain />,
  },

  {
    path: "basicStatistics",
    element: <BasicStatistics />,
  },
  {
    path: "MainTrashDistributionChart",
    element: <MainTrashDistributionChart />,
  },
]);

export default root;
