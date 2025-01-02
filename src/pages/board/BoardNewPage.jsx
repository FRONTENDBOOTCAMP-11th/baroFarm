import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BoardNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const isBoard = true;

  // form 태그를 참조
  const formRef = useRef(null);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "새 글 작성",
    });
  }, []);

  const check = (item) => {
    console.log(item);
  };

  return (
    <div className="relative mx-5">
      <NewPost
        isBoard={isBoard}
        handleSubmit={handleSubmit(check)}
        register={register}
      ></NewPost>
    </div>
  );
}
