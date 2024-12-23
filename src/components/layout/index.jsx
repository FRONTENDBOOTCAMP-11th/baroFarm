import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="max-w-[390px] mx-auto">
      <Header />
      <main className="px-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
