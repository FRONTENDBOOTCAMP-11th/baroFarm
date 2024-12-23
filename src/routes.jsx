import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Layout = lazy(() => import("@components/layout"));
const MenuPage = lazy(() => import("@pages/market/MenuPage"));
const CartPage = lazy(() => import("@pages/market/CartPage"));
const SearchPage = lazy(() => import("@pages/market/SearchPage"));
const SearchResultPage = lazy(() => import("@pages/market/SearchResultPage"));
// const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const MainPage = lazy(() => import("@pages/index"));
const LoginPage = lazy(() => import("@pages/user/Login"));
const SignupPage = lazy(() => import("@pages/user/Signup"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/menu", element: <MenuPage /> },
        { path: "pages/market/CartPage", element: <CartPage /> },
        { path: "pages/market/SearchPage", element: <SearchPage /> },
        { path: "user/signup", element: <SignupPage /> },
        { path: "user/login", element: <LoginPage /> },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
