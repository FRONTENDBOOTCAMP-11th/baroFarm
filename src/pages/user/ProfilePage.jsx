import Footer from "@components/layout/Footer";

export default function ProfilePage() {
  return (
    <div className="max-w-[390px] mx-auto">
      <header className="h-[70px]">헤더</header>
      <div className="pt-[18px]">
        <div className="h-[144px] px-[20px]">
          <div>
            <div className="flex flex-row items-center">
              <img src="" className="mr-5 w-[49px] h-[50px]" loading="lazy" />
              <div>
                <p className="text-gray2/50 text-[12px] leading-[14px]">
                  판매자
                </p>
                <h2 className="text-[16px] leading-[18px] mt-[4px]">
                  온도감님! 어서오세요
                </h2>
              </div>
              <a className="flex ml-auto h-fit items-center text-gray2/50 text-[14px]">
                프로필 보기
                <img
                  src="../../../../public/icons/icon_forward.svg"
                  className="h-[16px] ml-[11px]"
                  alt="profileDetail icon"
                />
              </a>
            </div>
            <div className="flex items-center border-gray3 border-t-[1px] mt-[14px] h-[58px]">
              <button className="flex-1 text-center h-[50px] border-r-[1px]">
                구매 내역
              </button>
              <button className="flex-1 text-center h-[50px] border-r-[1px]">
                판매 내역
              </button>
              <button className="flex-1 text-center h-[50px]">
                작성한 글 <span className="text-btn-primary">3건</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-[152px] px-[20px] pt-[18px] border-t-[7px] border-gray2">
          <h2 className="text-base leading-[19px]">구매 정보</h2>
          <a className="flex items-center text-gray2/50 text-[14px] mt-[27px]">
            최근 본 상품
            <img
              src="../../../../public/icons/icon_forward.svg"
              className="h-[16px] ml-auto"
              alt="profileDetail icon"
            />
          </a>
          <a className="flex items-center text-gray2/50 text-[14px] mt-[24px]">
            찜한 상품
            <img
              src="../../../../public/icons/icon_forward.svg"
              className="h-[16px] ml-auto"
              alt="profileDetail icon"
            />
          </a>
        </div>
        <div className="h-[152px] px-[20px] pt-[18px] border-t-[7px] border-gray2">
          <h2 className="text-base leading-[19px]">판매 정보</h2>
          <a className="flex items-center text-gray2/50 text-[14px] mt-[27px]">
            상품 등록
            <img
              src="../../../../public/icons/icon_forward.svg"
              className="h-[16px] ml-auto"
              alt="profileDetail icon"
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
