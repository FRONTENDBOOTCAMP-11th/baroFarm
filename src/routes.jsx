import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const BoardDetailPage = lazy(() => import("@pages/board/BoardDetailPage"));
const BoardNewPage = lazy(() => import("@pages/board/BoardNewPage"));
const BoardPage = lazy(() => import("@pages/board/BoardPage"));
const CategoryPage = lazy(() => import("@pages/market/CategoryPage"));
const ProductDetailPage = lazy(() => import("@pages/market/ProductDetailPage"));
const ProductNewPage = lazy(() => import("@pages/market/ProductNewPage"));
const ProductReviewPage = lazy(() => import("@pages/market/ProductReviewPage"));
const BookmarkPage = lazy(() => import("@pages/user/BookmarkPage"));
const MyPage = lazy(() => import("@pages/user/MyPage"));
const ProfilePage = lazy(() => import("@pages/user/ProfilePage"));
const MenuPage = lazy(() => import("@pages/market/MenuPage"));
const CartPage = lazy(() => import("@pages/market/CartPage"));
const SearchPage = lazy(() => import("@pages/market/SearchPage"));
const SearchResultsPage = lazy(() => import("@pages/market/SearchResultsPage"));
const MainPage = lazy(() => import("@pages/index"));
const LoginPage = lazy(() => import("@pages/user/LoginPage"));
const SignupPage = lazy(() => import("@pages/user/SignupPage"));
const Layout = lazy(() => import("@components/layout"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        {
          path: "/menu",
          children: [
            { index: true, element: <MenuPage /> },
            { path: ":category", element: <CategoryPage /> },
          ],
        },
        {
          path: "/product",
          children: [
            { path: ":_id", element: <ProductDetailPage /> },
            { path: ":_id/reviews", element: <ProductReviewPage /> },
            { path: "new", element: <ProductNewPage /> },
          ],
        },
        { path: "/cart", element: <CartPage /> },
        {
          path: "/search",
          children: [
            { index: true, element: <SearchPage /> },
            { path: "results", element: <SearchResultsPage /> },
          ],
        },
        {
          path: "/users",
          children: [
            { path: "signup", element: <SignupPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "mypage", element: <MyPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "bookmarks", element: <BookmarkPage /> },
          ],
        },
        {
          path: "/board",
          children: [
            { index: true, element: <BoardPage /> },
            { path: "new", element: <BoardNewPage /> },
            { path: ":_id", element: <BoardDetailPage /> },
          ],
        },
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
