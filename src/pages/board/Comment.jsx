import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentItem from "@pages/board/CommentItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

Comment.propTypes = {
  replies: PropTypes.array,
};

export default function Comment({ replies = [] }) {
  const { _id } = useParams();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const repliesList = replies.map((item) => (
    <CommentItem key={item._id} item={item}></CommentItem>
  ));

  const addComment = useMutation({
    mutationFn: async (item) => {
      if (user) return axios.post(`/posts/${_id}/replies`, item);
      else
        throw Error(
          "로그인 후에 이용할 수 있는 기능입니다. 로그인하시겠습니까?"
        );
    },
    onSuccess: (res) => {
      console.log("data", res.data);
      reset();
      alert("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", _id] });
    },
    onError: (err) => {
      console.error(err);
      if (!user && confirm(err)) {
        navigate("/users/login");
      }
    },
  });

  return (
    <>
      <section className="pt-5">
        <span className="font-semibold">댓글 ({replies.length})</span>
        {replies.length === 0 && (
          <div className="h-[85px]  flex justify-center items-center border-b-[1px] border-gray3/50">
            아직 댓글이 없습니다!
          </div>
        )}
        {replies.length !== 0 && repliesList}
      </section>
      <form
        className="h-[65px] flex px-5 -mx-5 items-center"
        onSubmit={handleSubmit(addComment.mutate)}
      >
        <input
          type="text"
          id="comment"
          name="comment"
          className="max-w-[285px] h-[35px] rounded-full px-[15px] mr-5 bg-gray1 flex-grow focus:outline-btn-primary"
          {...register("content")}
        />
        <div>
          <Button width={45} height={35} type="submit">
            등록
          </Button>
        </div>
      </form>
    </>
  );
}
