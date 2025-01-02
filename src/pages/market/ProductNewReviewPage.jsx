import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewReviewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const isBoard = false;

  const formRef = useRef(null);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "후기 작성",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const check = (item) => {
    console.log(item);
  };

  return (
    <>
      <NewPost
        isBoard={isBoard}
        formRef={formRef}
        handleSubmit={handleSubmit(check)}
        register={register}
      ></NewPost>
    </>
  );
}
