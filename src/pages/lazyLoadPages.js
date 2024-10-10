import { lazy } from "react";

export const Login = lazy(() => import("./LoginPage.jsx"));
export const Find = lazy(() => import("./FindPasswordPage.jsx"));
export const AdminMain = lazy(() => import("./admin/AdminMainPage.jsx"));
export const WorkerMain = lazy(() => import("./worker/WorkerMainPage.jsx"));
export const MyPageWorker = lazy(() => import("./worker/MyPageWorker.jsx"));
export const MyPageAdmin = lazy(() => import("./admin/MyPageAdmin.jsx"));
export const ResearchMain = lazy(() =>
  import("./worker/research/ResearchMainPage.jsx")
);
export const CleaningSelectMain = lazy(() =>
  import("./worker/cleaning/CleanerTaskSelectPage.jsx")
);
export const CleaningMain = lazy(() =>
  import("./worker/cleaning/CleaningMainPage.jsx")
);
export const PickUpMain = lazy(() =>
  import("./worker/cleaning/PickUpPlaceMainPage.jsx")
);
export const CollectingMain = lazy(() =>
  import("./worker/collecting/CollectingMainPage.jsx")
);
export const BasicStatistics = lazy(() =>
  import("./admin/BasicStatisticsPage.jsx")
);
export const MainTrashDistribution = lazy(() =>
  import("./admin/MainTrashDistributionPage.jsx")
);
export const PickupPredict = lazy(() =>
  import("./admin/PickupPredictPage.jsx")
);
export const NewWorks = lazy(() => import("./admin/NewWorksPage.jsx"));

export const WorkList = lazy(() => import("./admin/WorkListPage.jsx"));
export const ResearchReport = lazy(() =>
  import("./admin/ResearchReportPage.jsx")
);
export const CleanReport = lazy(() => import("./admin/CleanReportPage.jsx"));

export const AiAnalysis = lazy(() => import("./admin/AiAnalysisPage.jsx"));
