import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  // 헤더 title을 동적으로 렌더링하기 위한 상태 관리
  const [headerContents, setHeadetContents] = useState({});

  return (
    <div className="max-w-[390px] mx-auto">
      <Header {...headerContents} />
      <main className="pb-[100px]">
        {/* Outlet에 데이터를 전달하려면 반드시 context라는 이름으로 데이터를 제공해야 함 */}
        <Outlet context={{ setHeadetContents }} />
      </main>
      <Footer />
    </div>
  );
}
