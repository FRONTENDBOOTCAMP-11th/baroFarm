import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "상품 등록",
      rightChild: <Button>등록</Button>,
    });
  }, []);

  // div 내에 입력한 input & select 태그의 value 변경을 위함
  const [price, setPrice] = useState();
  const [tag, setTag] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // //select 태그를 참조
  // const selectRef = useRef(null);

  // // span 클릭 시 select의 클릭으로 처리
  // const handleSpanClick = () => {
  //   selectRef.current?.click(); // select 요소 클릭
  // };
  //문제가 발생하여 주석 처리

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsOpen(false); // 드롭다운 닫을 때 상태 초기화
  };

  const handlePriceChange = (e) => {
    // 숫자만 남기기
    setPrice(parseInt(e.target.value.replace(/[^0-9]/g, "")));
  };

  //price 값을 string값으로 변화
  const priceToString = price ? Number(price).toLocaleString() : "";
  return (
    <form className="mx-5 py-5" action="#">
      <input
        name="productName"
        type="text"
        className="bg-gray2/20 w-full h-[50px] px-4"
        placeholder="상품명을 입력해주세요."
      />
      <br />
      <div className="relative w-full">
        <select
          type="text"
          // ref={selectRef}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onClick={toggleDropdown}
          onBlur={handleBlur}
          className={`bg-gray2/20 w-full h-[50px] mt-[25px] px-4 appearance-none`}
        >
          <option value="select">카테고리</option>
          <option value="fruit">과일</option>
          <option value="vegetable">채소</option>
          <option value="kimchi">김치</option>
          <option value="livestock">축산물</option>
          <option value="seafood">수산물</option>
          <option value="ReadyToEat">간편식</option>
          <option value="Rice">쌀</option>
          <option value="RiceCake">떡</option>
        </select>
        <span
          // onClick={handleSpanClick}
          className={`absolute right-4 top-[42px] ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        >
          <img
            src="/icons/icon_back_thin.svg"
            alt="dropdown arrow"
            className="w-4 h-4"
          />
        </span>
      </div>
      <textarea
        name="productInfo"
        className="w-full my-[25px] h-[200px] p-3 border-gray3 border-[1px] bg-gray2/20"
        placeholder="본문 내용을 입력해주세요."
      ></textarea>
      <label className="font-bold">판매 희망 가격</label>
      <div className="relative w-full">
        <input
          type="text"
          name="price"
          value={priceToString}
          onChange={handlePriceChange}
          className="bg-gray2/20 w-full h-[50px] pr-12 px-4"
          placeholder="가격을 입력하세요"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
          원
        </span>
      </div>
      <br />
      <label className="font-bold">판매 희망 개수</label>
      <input
        type="text"
        className="bg-gray2/20 w-full h-[50px] mb-[25px] px-4"
        placeholder="판매 개수를 입력하세요"
      />
      <br />
      <label className="font-bold">이미지 첨부</label>
      <input
        type="file"
        id="attach"
        accept="image/*"
        placeholder="이미지를 선택하세요"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 mt-[10px]"
        name="attach"
      />
    </form>
  );
}
