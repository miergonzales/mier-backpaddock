import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";
import RouteError from "../components/errors/RouteError";

// eslint-disable-next-line react-refresh/only-export-components
const Countries = lazy(() => import("../features/countries"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Countries />,
      },
    ],
  },
]);

export default router;
