import { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

import PurchaseModal from "@components/PurchaseModal";
import Modal from "@components/Modal";

import productImage1 from "/images/Sample1.svg";
import forwardIcon from "/icons/icon_forward.svg";
import cartIcon from "/icons/icon_cart_modal.svg";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

import HeaderIcon from "@components/HeaderIcon";
import ReviewItem from "@components/ReviewBox";

export default function ProductDetailPage() {
  // const { _id } = useParams();
  // _id 사용해서 데이터 가져오기

  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const purchaseModalRef = useRef();
  const modalRef = useRef();

  const openPurchaseModal = () => {
    purchaseModalRef.current.open();
  };

  const openModal = () => {
    modalRef.current.open();
    purchaseModalRef.current.close();
  };

  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(1);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCount = (sign) => {
    if (sign === "plus") setCount((count) => count + 1);
    else if (sign === "minus" && count > 1) setCount((count) => count - 1);
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "제철과일",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  const productsData = {
    // example
    id: 1,
    image: productImage1,
    title: "온도감",
    option: "촉촉함이 다른 카스테라 5종",
    content:
      "대만 카스테라를 너무 좋아하던 1인으로서 이 카스테라 정말 맛있네요",
    sale: "92%",
    price: 14900,
    shoppingFees: 3500,
    rate: "⭐️ 4.9",
    review: "2,210",
    productContent:
      '\n          <div class="product-detail">\n            <p>레고 테크닉 42151 부가티 볼리드 상세 설명</p>\n          </div>',
  };

  const formattedPrice = Intl.NumberFormat().format(productsData.price);

  return (
    <>
      <img src={productsData.image} />
      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center gap-[10px] pb-5">
          <img
            src={productsData.image}
            className="w-[25px] h-[25px] rounded-full"
          />
          <span className="font-semibold ">{productsData.title}</span>
        </div>

        <p>{productsData.option}</p>

        <span className="font-semibold text-xs pr-2">{productsData.rate}</span>
        <span className="text-xs">{productsData.review}개 후기</span>

        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">
            {productsData.sale}
          </span>
          <span className="font-extrabold text-lg">{formattedPrice}원</span>
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center justify-between">
          <span className="font-bold">후기 {productsData.review}개</span>
          <Link
            to={`/product/${productsData.id}/reviews`}
            className="font-medium text-sm text-gray5 flex items-center"
          >
            전체보기
            <img src={forwardIcon} className="w-3" />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide">
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div
          dangerouslySetInnerHTML={{ __html: productsData.productContent }}
        />
      </section>
      <footer className="h-[100px] p-5 border-t border-gray1 flex items-center justify-between fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white">
        <button onClick={handleLike} className="pl-2">
          <img
            src={isLiked ? likeIcon.active : likeIcon.default}
            className="w-10"
          />
          <span className="text-sm font-medium">찜</span>
        </button>
        <button
          onClick={openPurchaseModal}
          className="w-[280px] text-lg text-white bg-btn-primary p-4 rounded-[10px]"
        >
          구매하기
        </button>
      </footer>

      <PurchaseModal ref={purchaseModalRef}>
        <p className="text-sm font-semibold">개수 선택</p>
        <div className="text-sm border border-gray3 rounded-[10px] p-5">
          <p>{productsData.option}</p>
          <div className="flex gap-2 items-center mt-5">
            <button
              className="w-6 h-6 bg-gray2 rounded-[5px]  text-white flex items-center justify-center"
              onClick={() => handleCount("minus")}
            >
              -
            </button>
            <span className="w-10 h-6 border rounded-[5px] flex items-center justify-center">
              {count}
            </span>
            <button
              className="w-6 h-6 bg-gray2 rounded-[5px]  text-white flex items-center justify-center"
              onClick={() => handleCount("plus")}
            >
              +
            </button>
            <span className="ml-auto text-base font-semibold">
              {Intl.NumberFormat().format(productsData.price * count)}원
            </span>
          </div>
        </div>
        <div className="bg-gray1 border-y border-gray3 border-t py-3 flex justify-center">
          <p className="">
            상품 금액 {Intl.NumberFormat().format(productsData.price * count)}{" "}
            원 + 배송비 {productsData.shoppingFees} 원
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 text-lg text-btn-primary p-3 rounded-[10px] border border-btn-primary"
            onClick={openModal}
          >
            장바구니
          </button>
          <button
            className="flex-1 text-lg text-white bg-btn-primary p-3 rounded-[10px]"
            onClick={() => navigate("/payment")}
          >
            구매하기
          </button>
        </div>
      </PurchaseModal>
      <Modal ref={modalRef}>
        <p className="text-center text-lg font-">
          <strong className="font-semibold">장바구니</strong>에 <br /> 상품을
          담았어요
        </p>
        <img src={cartIcon} className="w-[66px]" />
        <Link to="/cart">
          <span className="font-light border-b border-b-black">바로가기</span>
        </Link>
      </Modal>
    </>
  );
}
