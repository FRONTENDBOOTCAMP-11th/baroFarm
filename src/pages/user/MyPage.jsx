import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function MyPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "마이 페이지",
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  return (
    <div className="pt-[18px] px-5 mb-[70px]">
      <div className="h-[144px]">
        <div>
          <div className="flex flex-row items-center">
            <img
              src="/images/ProfileImage_Sample.svg"
              className="mr-5 w-[49px] h-[50px]"
              loading="lazy"
            />
            <div>
              <p className="text-gray5/50 text-[12px] leading-[14px]">판매자</p>
              <h2 className="text-[16px] leading-[18px] mt-[4px]">
                온도감님! 어서오세요
              </h2>
            </div>
            <a className="flex ml-auto h-fit items-center text-[14px]">
              프로필 보기
              <img
                src="/icons/icon_forward.svg"
                className="h-4 ml-2"
                alt="profileDetail icon"
              />
            </a>
          </div>
          <div className="flex items-center border-t-[1px] border-gray2 h-[58px] mt-[16px]">
            <button className="flex-1 text-center h-[50px] border-r-[1px] border-gray2">
              구매 내역
            </button>
            <button className="flex-1 text-center h-[50px] border-r-[1px] border-gray2">
              판매 내역
            </button>
            <button className="flex-1 text-center h-[50px]">
              작성한 글 <span className="text-btn-primary">3건</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[7px] bg-gray1 mx-[-20px]"></div>
      <div className="h-[152px] pt-[18px]">
        <h2 className="text-base leading-[19px]">구매 정보</h2>
        <a className="flex items-center text-[14px] mt-[27px]">
          최근 본 상품
          <img
            src="/icons/icon_forward.svg"
            className="h-[16px] ml-auto"
            alt="recentProduct icon"
          />
        </a>
        <a className="flex items-center text-[14px] mt-[24px]">
          찜한 상품
          <img
            src="/icons/icon_forward.svg"
            className="h-[16px] ml-auto"
            alt="likedProduct icon"
          />
        </a>
      </div>
      <div className="h-[7px] bg-gray1 mx-[-20px]"></div>
      <div className="h-[152px] pt-[18px] ">
        <h2 className="text-base leading-[19px]">판매 정보</h2>
        <a className="flex items-center text-[14px] mt-[27px] mb-[24px]">
          상품 등록
          <img
            src="/icons/icon_forward.svg"
            className="h-[16px] ml-auto"
            alt="addProduct icon"
          />
        </a>
      </div>
    </div>
  );
}
