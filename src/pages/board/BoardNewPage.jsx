import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BoardNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // form 태그를 참조
  const formRef = useRef(null);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "새 글 작성",
      rightChild: (
        <Button
          width="45px"
          height="20px"
          onClick={() =>
            formRef.current?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
          }
        >
          등록
        </Button>
      ),
    });
  }, []);

  const check = (item) => {
    console.log(item);
  };

  return (
    <form
      className="relative mx-5"
      ref={formRef}
      onSubmit={handleSubmit(check)}
    >
      <div className="flex flex-row mt-5 items-center">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="ProfileImage"
          className="w-6 h-6"
        />
        <span className="mx-[5px] text-sm">온도감</span>
      </div>
      <textarea
        name="content"
        id="content"
        className="w-full mt-[10px] mb-[25px] h-[200px] p-3 border-gray3 border-[1px] bg-gray2/20 focus:outline-btn-primary rounded-md"
        placeholder="본문 내용을 입력해주세요."
        {...register("content", {
          required: "본문 내용을 입력해주세요",
        })}
      ></textarea>
      <br />
      <label className="font-bold">이미지 첨부</label>
      <input
        type="file"
        id="attach"
        accept="image/*"
        placeholder="이미지를 선택하세요"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 mt-[10px]"
        name="attach"
        {...register("image")}
      />
    </form>
  );
}
