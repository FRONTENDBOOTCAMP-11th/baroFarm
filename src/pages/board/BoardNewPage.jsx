import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import { useEffect, useRef } from "react";
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
    <div className="relative mx-5">
      <div className="flex flex-row mt-5 items-center">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="ProfileImage"
          className="w-6 h-6 rounded-full border border-btn-primary"
        />
        <span className="mx-[5px] text-sm">온도감</span>
      </div>
      <NewPost
        isBoard={isBoard}
        formRef={formRef}
        handleSubmit={handleSubmit(check)}
        register={register}
      ></NewPost>
    </div>
  );
}
