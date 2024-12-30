import HeaderIcon from "@components/HeaderIcon";
import BoardPageDetail from "@pages/board/BoardPageDetail";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function BoardPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const [tag, setTag] = useState("자유");

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: `${tag} 게시판`,
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
      <div className="flex flex-row h-[50px] mx-[-20px] max-w-[calc(100%+40px)] ">
        <button className="flex w-full justify-center text-sm items-center border-r-[1px] border-gray3/50">
          자유
        </button>
        <button className="flex w-full justify-center text-sm items-center border-gray3/50">
          정보 공유
        </button>
      </div>
      <BoardPageDetail />
      <BoardPageDetail />
      <Link
        to="new"
        className="fixed right-[calc(50%-195px+20px)] bottom-[120px] w-[50px] h-[50px] rounded-full bg-gray5"
      >
        <img src="/icons/icon_plus_2.svg" className="w-full h-full" />
      </Link>
    </div>
  );
}
