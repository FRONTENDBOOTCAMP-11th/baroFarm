import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "상품 등록",
    });
  }, []);

  return (
    <form className="mx-5 py-5" action="#">
      <input
        type="text"
        className="bg-gray2/20 w-full h-[50px] px-4"
        placeholder="상품명을 입력해주세요."
      />
      <br />
      <select
        type="text"
        className="bg-gray2/20 w-full h-[50px] mt-[25px] px-4"
        placeholder="본문 내용을 입력해주세요."
      >
        <option value="select">카테고리</option>
        <option value="">과일</option>
        <option value="">채소</option>
        <option value="">김치</option>
        <option value="">축산물</option>
        <option value="">수산물</option>
        <option value="">간편식</option>
        <option value="">쌀</option>
        <option value="">떡</option>
      </select>
      <textarea
        name="contents"
        id="contents"
        className="w-full my-[25px] h-[200px] p-3 border-gray3 border-[1px] bg-gray2/20 "
        placeholder="본문 내용을 입력해주세요."
      ></textarea>
      <label className="font-bold">판매 희망 가격</label>
      <input
        type="text"
        className="bg-gray2/20 w-full h-[50px] mb-[25px] px-4"
      />
      <br />
      <label className="font-bold">판매 희망 개수</label>
      <input
        type="text"
        className="bg-gray2/20 w-full h-[50px] mb-[25px] px-4"
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
      <Button>등록</Button>
    </form>
  );
}
