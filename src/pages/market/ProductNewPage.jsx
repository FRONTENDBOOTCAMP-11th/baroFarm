import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "상품 등록",
    });
  }, []);

  // div 내에 입력한 input & select 태그의 value 변경을 위함
  const [price, setPrice] = useState();
  const [tag, setTag] = useState("");
  const [checkDiscount, setCheckDiscount] = useState(false);

  // form 태그를 참조
  const formRef = useRef(null);

  const queryClient = useQueryClient();

  // access token 하드 코딩
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  // 숫자만 남기기
  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value.replace(/[^0-9]/g, "")));
  };

  //price 값을 string값으로 변화
  const priceToString = price ? Number(price).toLocaleString() : "";

  //업로드되는 파일은 이미지 파일로 제한
  const checkImg = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg",
    ]; // 허용 MIME 타입
    if (!validTypes.includes(file.type)) {
      return true;
    }
    return false;
  };

  //상품 추가 함수
  //이미지 업로드와 카테고리 조회를 먼저 실행한 후 해당 함수에서 반환된 값을 가지고 body객체를 생성
  const addProduct = useMutation({
    mutationFn: async (item) => {
      let imageUrl = null;
      let imageName = null;
      let imageOriginalName = null;

      // 이미지 파일 확인 절차
      if (checkImg(item.image[0])) {
        throw new Error("이미지 파일을 업로드해야 합니다");
      }
      // 이미지 첨부는 필수이므로 이미지 첨부가 되어있지 않다면 아예 생성되지 않음
      if (item.image && item.image[0]) {
        const formData = new FormData();
        formData.append("attach", item.image[0]);
        try {
          const uploadImg = await axios.post(
            `https://11.fesp.shop/files`,
            formData,
            {
              headers: {
                "client-id": "final04",
              },
            }
          );
          imageUrl = uploadImg.data.item[0].path; // 서버에서 반환된 이미지 URL
          imageName = uploadImg.data.item[0].name; // 서버에서 반환된 이미지 이름
          imageOriginalName = uploadImg.data.item[0].originalname; // 서버에서 반환된 이미지 원본 이름
        } catch (error) {
          console.error(
            "Image upload failed:",
            error.response?.data || error.message
          );
          throw new Error("Image upload failed.");
        }
        const codes = await axios.get("https://11.fesp.shop/codes", {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
          },
        });
        const categoryList = codes.data.item.nested.productCategory.codes;
        const category = categoryList.filter(
          (data) => data.code == item.category
        );

        const body = {
          name: item.name,
          content: `<p>${item.content}</p>`,
          price: price,
          shippingFees: price >= 35000 ? 2500 : 0,
          quantity: parseInt(item.quantity),
          extra: {
            isNew: true,
            isBest: false,
            bestSeason:
              item.seasonStart !== item.seasonEnd
                ? [parseInt(item.seasonStart), parseInt(item.seasonEnd)]
                : [parseInt(item.seasonStart)], // 두 제철 값이 같은 경우에는 값 하나만 입력되게 함
            category: category[0].code,
            sort: category[0].sort,
            depth: category[0].depth,
            sale: item.sale ? parseInt(item.sale) : 0,
            saledPrice:
              Math.round(
                (price * (1 - (item.sale ? parseInt(item.sale) : 0) / 100)) / 10
              ) * 10,
            // 새로운 상품이므로 평점은 0으로 초기화
            rating: 0,
          },
          mainImages: {
            path: imageUrl,
            name: imageName,
            originalname: imageOriginalName,
          },
        };
        return axios.post("https://11.fesp.shop/seller/products", body, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
          },
        });
      }
    },
    onSuccess: () => {
      alert("상품이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", "community"] });
      // 판매 내역 페이지로 이동하도록 이후 설정
      navigate("/users/mypage");
    },
    onError: (error) => {
      setValue("image", null);
      console.error("에러 발생: ", error.message);
      alert(`에러: ${error.message}`);
    },
  });

  return (
    <form
      className="mx-5 py-5"
      ref={formRef}
      onSubmit={handleSubmit(addProduct.mutate)}
    >
      <input
        name="name"
        id="name"
        type="text"
        className="bg-gray2/20 w-full h-[50px] px-4 focus:outline-btn-primary rounded-md"
        placeholder="상품명을 입력해주세요."
        {...register("name", {
          required: "필수 입력 정보입니다",
        })}
      />
      {errors.name && (
        <p className="text-red1 text-xs mt-1 ps-1">{errors.name.message}</p>
      )}

      <select
        id="category"
        name="category"
        type="text"
        value={tag}
        className={`mt-[25px] text-center bg-gray2 rounded-lg py-1  pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem] w-1/2`}
        {...register("category", {
          required: "필수 입력 정보입니다",
          onChange: (e) => setTag(e.target.value),
        })}
      >
        <option value="">카테고리</option>
        <option value="fruit">과일</option>
        <option value="vegetable">채소</option>
        <option value="kimchi">김치</option>
        <option value="liveStock">축산물</option>
        <option value="seafood">수산물</option>
        <option value="simple">간편식</option>
        <option value="rice">쌀</option>
        <option value="riceCake">떡</option>
      </select>
      {errors.category && (
        <p className="text-red1 text-xs mt-1 ps-1">{errors.category.message}</p>
      )}
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
            {...register("seasonStart")}
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
            {...register("seasonEnd")}
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
        name="content"
        className="border-2 border-white w-full mt-[25px] h-[200px] p-3 bg-gray2/20 outline-none focus:border-btn-primary rounded-md"
        placeholder="상품 소개문을 입력해주세요."
        {...register("content", {
          required: "필수 입력 정보입니다",
        })}
      ></textarea>
      {errors.content && (
        <p className="text-red1 text-xs ps-1 -mt-1">{errors.content.message}</p>
      )}
      <label className="font-bold block mt-[15px]">판매 희망 가격</label>
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
      {errors.price && (
        <p className="text-red1 text-xs mt-1 ps-1">{errors.price.message}</p>
      )}
      <br />
      <label className="font-bold">판매 희망 개수</label>
      <input
        type="number"
        name="quantity"
        className="bg-gray2/20 w-full h-[50px] px-4 mt-[10px] focus:outline-btn-primary rounded-md"
        placeholder="판매 개수를 입력하세요"
        {...register("quantity", {
          required: "필수 입력 정보입니다",
        })}
      />
      {errors.quantity && (
        <p className="text-red1 text-xs mt-1 ps-1">{errors.quantity.message}</p>
      )}
      <div className="flex gap-1 items-center mt-[25px]">
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
        <>
          <label className="font-bold block mt-[25px]">할인률 %</label>
          <div className="relative w-full">
            <input
              id="sale"
              name="sale"
              type="text"
              className="bg-gray2/20 w-full h-[50px] pr-12  focus:text-right px-4 mt-[10px] focus:outline-btn-primary rounded-md"
              placeholder="1 ~ 99 까지의 할인율을 입력하세요"
              {...register("sale", {
                required: "필수 입력 정보입니다",
                validate: (value) => {
                  const sale = parseInt(value); // 현재 sale의 값
                  return (
                    (sale >= 1 && sale <= 99) ||
                    "1~99 사이의 숫자여야만 합니다."
                  );
                },
              })}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/4 text-gray-600">
              %
            </span>
          </div>
          {errors.sale && (
            <p className="text-red1 text-xs mt-1 ps-1">{errors.sale.message}</p>
          )}
        </>
      )}
      <label className="font-bold block mt-[25px]">이미지 첨부</label>
      <input
        type="file"
        id="attach"
        accept="image/*"
        placeholder="이미지를 선택하세요"
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 mt-[10px] focus:outline-btn-primary mb-[25px]"
        name="attach"
        {...register("image", {
          required: "이미지 파일을 선택해주세요.",
        })}
        required
      />
      <Button height="45px" fontSize={24} type="submit" isBig={true}>
        등록
      </Button>
    </form>
  );
}
