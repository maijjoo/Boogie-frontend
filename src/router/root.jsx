import { createBrowserRouter } from "react-router-dom";

import {
  Login,
  Find,
  AdminMain,
  WorkerMain,
  MyPageWorker,
  MyPageAdmin,
  ResearchMain,
  CleaningSelectMain,
  CleaningMain,
  PickUpMain,
  CollectingMain,
  BasicStatistics,
  MainTrashDistribution,
  PickupPredict,
  NewWorks,
  WorkList,
  AiAnalysis,
  ResearchReport,
  CleanReport,
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
    path: "myPageWorker",
    element: <MyPageWorker />,
  },
  {
    path: "myPageAdmin",
    element: <MyPageAdmin />,
  },
  {
    path: "researchMain",
    element: <ResearchMain />,
  },
  {
    path: "cleaningSelect",
    element: <CleaningSelectMain />,
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
    path: "mainTrashDistribution",
    element: <MainTrashDistribution />,
  },
  {
    path: "pickupPredict",
    element: <PickupPredict />,
  },
  {
    path: "newWorks",
    element: <NewWorks />,
  },
  {
    path: "workList",
    element: <WorkList />,
  },
  {
    path: "ResearchReport",
    element: <ResearchReport />,
  },
  {
    path: "CleanReport",
    element: <CleanReport />,
  },
  {
    path: "aiAnalysis",
    element: <AiAnalysis />,
  },
]);

export default root;
