import { lazy } from "react";

export const Login = lazy(() => import("./LoginPage.jsx"));
export const Find = lazy(() => import("./FindPasswordPage.jsx"));
export const AdminMain = lazy(() => import("./admin/AdminMainPage.jsx"));
export const WorkerMain = lazy(() => import("./worker/WorkerMainPage.jsx"));
