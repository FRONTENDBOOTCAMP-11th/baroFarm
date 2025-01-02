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
      title: `바로파밍`,
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
      <div className="flex my-2 items-center bg-green1 rounded-md">
        <img
          src="/images/BaroFarmLogo.svg"
          alt="바로팜 로고"
          className="w-[90px]"
        />
        <p className="text-white text-sm break-keep">
          바로파밍은 모든 이용자들을 위한
          <span className="text-btn-primary"> 소통</span>의 공간입니다.
          <br /> 매너를 지키는 바로팜인이 됩시다!
        </p>
      </div>
      <div className="h-[7px] bg-gray1 -mx-5"></div>
      <BoardPageDetail />
      <BoardPageDetail />
      <Link
        to="new"
        className="fixed right-[calc(50%-155px)] bottom-[130px] w-[40px] h-[40px] rounded-full shadow-bottom"
      >
        <img src="/icons/icon_newpost.svg" className="w-full h-full" />
      </Link>
    </div>
  );
}
