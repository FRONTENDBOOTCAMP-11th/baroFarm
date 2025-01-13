import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function BoardEditPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const item = location.state.item;
  const { _id } = useParams();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "게시글 수정하기",
    });
  }, []);

  const editPost = useMutation({
    mutationFn: (formData) => {
      return axios.patch(`/post/${_id}`, formData);
    },
    onSuccess: () => {
      alert("게시물이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/board/${_id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(editPost.mutate)}>
        <textarea
          name="content"
          id="content"
          className="w-full mt-[10px] mb-[25px] h-[550px] p-3 border-gray3 border-[1px] bg-gray2/20 focus:outline-btn-primary rounded-md"
          placeholder="본문 내용을 입력해주세요."
          defaultValue={item.content}
          {...register("content", {
            required: "본문 내용을 입력해주세요",
          })}
        ></textarea>
        {errors.content && (
          <p className="text-red1 text-xs mt-1 ps-1">
            {errors.content.message}
          </p>
        )}
        <Button height="45px" fontSize={24} type="submit" isBig={true}>
          수정
        </Button>
      </form>
    </div>
  );
}
