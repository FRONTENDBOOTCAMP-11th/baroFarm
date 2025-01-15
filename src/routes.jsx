import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const BoardDetailPage = lazy(() => import("@pages/board/BoardDetailPage"));
const BoardNewPage = lazy(() => import("@pages/board/BoardNewPage"));
const BoardEditPage = lazy(() => import("@pages/board/BoardEditPage"));
const BoardPage = lazy(() => import("@pages/board/BoardPage"));
const CategoryPage = lazy(() => import("@pages/market/CategoryPage"));
const ProductDetailPage = lazy(() => import("@pages/market/ProductDetailPage"));
const ProductNewPage = lazy(() => import("@pages/market/ProductNewPage"));
const ReviewPage = lazy(() => import("@pages/market/ReviewPage"));
const PhotoReviewPage = lazy(() => import("@pages/market/PhotoReviewPage"));
const ProductMyReviewPage = lazy(() =>
  import("@pages/market/ProductMyReviewPage")
);
const ProductNewReviewPage = lazy(() =>
  import("@pages/market/ProductNewReviewPage")
);
const BookmarkPage = lazy(() => import("@pages/user/BookmarkPage"));
const MyPage = lazy(() => import("@pages/user/MyPage"));
const ProfilePage = lazy(() => import("@pages/user/ProfilePage"));
const RecentPage = lazy(() => import("@pages/user/RecentPage"));
const SalePage = lazy(() => import("@pages/user/SalePage"));
const EditProductPage = lazy(() => import("@pages/user/EditProduct"));
const PurchasePage = lazy(() => import("@pages/user/PurchasePage"));
const MenuPage = lazy(() => import("@pages/market/MenuPage"));
const CartPage = lazy(() => import("@pages/market/CartPage"));
const PaymentPage = lazy(() => import("@pages/market/PaymentPage"));
const OrderCompletePage = lazy(() => import("@pages/market/OrderCompletePage"));
const SearchPage = lazy(() => import("@pages/market/SearchPage"));
const SearchResultsPage = lazy(() => import("@pages/market/SearchResultsPage"));
const MainPage = lazy(() => import("@pages/index"));
const LoginPage = lazy(() => import("@pages/user/LoginPage"));
const SignupPage = lazy(() => import("@pages/user/SignupPage"));
const EditProfilePage = lazy(() => import("@pages/user/EditProfilePage"));
const MyPostPage = lazy(() => import("@pages/user/MyPostPage"));
const SearchBestPage = lazy(() => import("@pages/market/SearchBestPage"));
const SearchNewPage = lazy(() => import("@pages/market/SearchNewPage"));
const SearchSeasonalPage = lazy(() =>
  import("@pages/market/SearchSeasonalPage")
);
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
            { path: ":_id/reviews", element: <ReviewPage /> },
            { path: ":_id/reviews/photo", element: <PhotoReviewPage /> },
            { path: ":_id/reviewed", element: <ProductMyReviewPage /> },
            {
              path: ":_id/reviews/new/:order_id",
              element: <ProductNewReviewPage />,
            },
            { path: "new", element: <ProductNewPage /> },
          ],
        },
        { path: "/cart", element: <CartPage /> },
        { path: "/payment", element: <PaymentPage /> },
        { path: "/complete", element: <OrderCompletePage /> },
        {
          path: "/search",
          children: [
            { index: true, element: <SearchPage /> },
            { path: "results", element: <SearchResultsPage /> },
            { path: "best", element: <SearchBestPage /> },
            { path: "new", element: <SearchNewPage /> },
            { path: "seasonal", element: <SearchSeasonalPage /> },
          ],
        },
        {
          path: "/users",
          children: [
            { path: "signup", element: <SignupPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "mypage", element: <MyPage /> },
            {
              path: "profile",
              children: [
                { index: true, element: <ProfilePage /> },
                { path: "edit", element: <EditProfilePage /> },
              ],
            },

            { path: "bookmarks", element: <BookmarkPage /> },
            { path: "recent", element: <RecentPage /> },
            {
              path: "sale",
              children: [
                { index: true, element: <SalePage /> },
                { path: ":id/edit", element: <EditProductPage /> },
              ],
            },
            { path: "purchase", element: <PurchasePage /> },
            { path: "myboard", element: <MyPostPage /> },
          ],
        },
        {
          path: "/board",
          children: [
            { index: true, element: <BoardPage /> },
            { path: "new", element: <BoardNewPage /> },
            { path: ":_id", element: <BoardDetailPage /> },
            { path: ":_id/edit", element: <BoardEditPage /> },
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
