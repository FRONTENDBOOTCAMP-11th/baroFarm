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
    <div className="mx-5 py-5">
      <input type="text" className="bg-gray2/20 w-full h-[42px]" />
      <br />
      <input type="text" className="bg-gray2/20 w-full h-[42px] mt-[25px]" />
      <textarea
        name="contents"
        id="contents"
        className="w-full my-[25px] h-[200px] p-3 border-gray3 border-[1px] bg-gray2/20"
        placeholder="본문 내용을 입력해주세요."
      ></textarea>
      <label className="font-bold">이미지 첨부</label>
      <input type="text" className="bg-gray2/20 w-full h-[42px]" /> <br />
      <label className="font-bold">이미지 첨부</label>
      <input type="text" className="bg-gray2/20 w-full h-[42px]" /> <br />
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
    </div>
  );
}
