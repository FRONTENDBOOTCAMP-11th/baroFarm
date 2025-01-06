import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewPage() {
  const { register, handleSubmit } = useForm();
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "상품 등록",
    });
  }, []);

  const check = (item) => {
    console.log(item);
  };

  // div 내에 입력한 input & select 태그의 value 변경을 위함
  const [price, setPrice] = useState();
  const [tag, setTag] = useState("");
  const [discount, setDiscount] = useState();
  const [checkDiscount, setCheckDiscount] = useState(false);

  // form 태그를 참조
  const formRef = useRef(null);

  const handlePriceChange = (e) => {
    // 숫자만 남기기
    setPrice(parseInt(e.target.value.replace(/[^0-9]/g, "")));
  };

  //price 값을 string값으로 변화
  const priceToString = price ? Number(price).toLocaleString() : "";
  return (
    <form className="mx-5 py-5" ref={formRef} onSubmit={handleSubmit(check)}>
      <input
        name="option"
        id="option"
        type="text"
        className="bg-gray2/20 w-full h-[50px] px-4 focus:outline-btn-primary rounded-md"
        placeholder="상품명을 입력해주세요."
        {...register("option", {
          required: "상품명을 입력해주세요",
        })}
      />
      <br />

      <select
        type="text"
        value={tag}
        className={`mt-[25px] text-center bg-gray2 rounded-lg py-1  pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem] w-1/2`}
        {...register("category", {
          required: "상품명 종류를 선택해주세요",
          onChange: (e) => setTag(e.target.value),
        })}
      >
        <option value="null">카테고리</option>
        <option value="fruit">과일</option>
        <option value="vegetable">채소</option>
        <option value="kimchi">김치</option>
        <option value="livestock">축산물</option>
        <option value="seafood">수산물</option>
        <option value="ReadyToEat">간편식</option>
        <option value="Rice">쌀</option>
        <option value="RiceCake">떡</option>
      </select>

      {tag === "fruit" && (
        <>
          <label className="font-bold block mt-[25px] mb-2">
            제철 지정 (선택)
          </label>
          <select
            className="text-center bg-gray2 rounded-lg py-1 pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem] w-1/3"
            type="month"
            id="seasonStart"
            name="seasonStart"
            required
          >
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
          <span className="mx-[0.5rem]">~</span>
          <select
            className=" text-center bg-gray2 rounded-lg py-1 pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem] w-1/3"
            type="month"
            id="seasonEnd"
            name="seasonEnd"
            required
          >
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </>
      )}
      <textarea
        name="productInfo"
        className="border-2 border-white w-full mt-[25px] mb-[15px] h-[200px] p-3 bg-gray2/20 outline-none focus:border-btn-primary rounded-md"
        placeholder="상품 소개문을 입력해주세요."
        {...register("productContent", {
          required: "상품 소개문을 입력해주세요",
        })}
      ></textarea>
      <label className="font-bold">판매 희망 가격</label>
      <div className="relative w-full mt-[10px]">
        <input
          type="text"
          name="price"
          value={priceToString}
          className="bg-gray2/20 w-full h-[50px] pr-12 px-4 focus:text-right placeholder:text-left focus:outline-btn-primary rounded-md"
          placeholder="가격을 입력하세요"
          {...register("price", {
            required: "필수 입력 정보입니다",
            onChange: handlePriceChange,
          })}
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
          원
        </span>
      </div>
      <br />
      <label className="font-bold">판매 희망 개수</label>
      <input
        type="text"
        className="bg-gray2/20 w-full h-[50px] mb-[25px] px-4 mt-[10px] focus:outline-btn-primary rounded-md"
        placeholder="판매 개수를 입력하세요"
        {...register("quantity", {
          required: "필수 입력 정보입니다",
        })}
      />
      <div className="flex gap-1 items-center mb-[25px]">
        <p className="font-bold">할인을 적용하시겠습니까?</p>
        <input
          type="radio"
          className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer"
          name="discount"
          id="discount-true"
          value="true"
          required
          onChange={() => {
            setCheckDiscount(true);
          }}
        />
        <label className="cursor-pointer" htmlFor="discount-true">
          예
        </label>
        <input
          type="radio"
          className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer"
          name="discount"
          id="discount-false"
          value="false"
          defaultChecked
          required
          onChange={() => {
            setCheckDiscount(false);
          }}
        />
        <label className="cursor-pointer" htmlFor="discount-false">
          아니오
        </label>
      </div>
      {checkDiscount && (
        <div className="relative w-full">
          <label className="font-bold block">할인률 %</label>
          <input
            type="text"
            className="bg-gray2/20 w-full h-[50px] pr-12  focus:text-right mb-[25px] px-4 mt-[10px] focus:outline-btn-primary rounded-md"
            placeholder="5 ~ 99 까지의 할인률을 입력하세요"
            {...register("discount", {
              required: "필수 입력 정보입니다",
            })}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/3 text-gray-600">
            %
          </span>
        </div>
      )}
      <label className="font-bold">이미지 첨부</label>
      <input
        type="file"
        id="attach"
        accept="image/*"
        placeholder="이미지를 선택하세요"
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 mt-[10px] focus:outline-btn-primary mb-[25px]"
        name="attach"
        {...register("image")}
      />
      <Button height="45px" fontSize={24} type="submit" isBig={true}>
        등록
      </Button>
    </form>
  );
}
