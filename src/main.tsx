import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import LuxuryHome from "./pages/LuxuryHome";
import LuxurySalons from "./pages/LuxurySalons";
import SalonDetail from "./pages/SalonDetail";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LuxuryHome />,
      },
      {
        path: "salons",
        element: <LuxurySalons />,
      },
      {
        path: "salon/:id",
        element: <SalonDetail />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/signup",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
