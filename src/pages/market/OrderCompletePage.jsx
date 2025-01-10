import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function OrderCompletePage() {
  // 헤더 아이콘 설정
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      title: (
        <img
          src="/images/BaroFarmLogo.svg"
          alt="홈 버튼"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      ),
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  const location = useLocation();
  console.log(location);
  const selectedItems = location.state.product.selectedItems;

  return (
    <div>
      <article className="max-w-[350px] mt-[50px] mx-auto shadow-lg mb-[50px] pb-10">
        <section className="flex flex-col gap-5 justify-center items-center py-10 border-b-2 border-dashed">
          <div className="bg-btn-primary size-14 rounded-full flex justify-center items-center">
            <img
              src="/icons/icon_check.svg"
              alt="체크 아이콘"
              className="size-7"
            />
          </div>
          <p className="text-xl font-semibold">주문이 완료되었습니다</p>
        </section>
        <section className="flex flex-col gap-3 px-6 pt-6 pb-10 *:pb-3">
          <div className="flex justify-between items-center border-b">
            <span className="text-gray4">결제금액</span>
            <span className="text-xl text-btn-primary font-semibold">
              23,240원
            </span>
          </div>
          <div className="space-y-2 border-b">
            <span className="text-gray4">주문상품</span>
            <div className="flex justify-between text-sm font-light pl-3 gap-5">
              <p className="truncate">
                [소스증정] 반값!! 고니알탕 (겨울 기획상품)awefawefawef
              </p>
              <span className="w-11 shrink-0 text-right text-gray4">1개</span>
            </div>
            <div className="flex justify-between text-sm font-light pl-3 gap-5">
              <p className="truncate">
                [소스증정] 반값!! 고니알탕 (겨울 기획상품)awefawefawef
              </p>
              <span className="w-11 shrink-0 text-right text-gray4">1개</span>
            </div>
          </div>
          <div className="space-y-2 border-b">
            <span className="text-gray4">배송지</span>
            <div className="space-y-0.5 text-sm pl-3">
              <p>강진수</p>
              <p className="text-gray4">010-0000-0000</p>
              <p>서울특별시 마포구 동교로 194</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-gray4">배송메모</span>
            <p className="text-sm pl-3">배송 전에 미리 연락 바랍니다.</p>
          </div>
        </section>
        <section className="px-4">
          <Button isBig={true} onClick={() => navigate("/")}>
            홈으로
          </Button>
        </section>
      </article>
    </div>
  );
}
