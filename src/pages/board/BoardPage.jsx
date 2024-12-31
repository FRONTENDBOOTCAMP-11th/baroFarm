import HeaderIcon from "@components/HeaderIcon";
import BoardPageDetail from "@pages/board/BoardPageDetail";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function BoardPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "바로파밍",
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);
  return (
    <div className="relative mx-5">
      <div>
        <p>
          바로파밍은 모든 이용자들을 위한 소통의 공간입니다. 매너를 지키는
          바로팜 人이 됩시다!
        </p>
      </div>
      <BoardPageDetail />
      <BoardPageDetail />
      <Link
        to="new"
        className="fixed right-[calc(50%-195px+20px)] bottom-[120px] w-[40px] h-[40px] rounded-full bg-btn-primary"
      >
        <img src="/icons/icon_plus_2.svg" className="w-full h-full" />
      </Link>
    </div>
  );
}
