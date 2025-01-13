import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentItem from "@pages/board/CommentItem";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

Comment.propTypes = {
  replies: PropTypes.array.isRequired,
};

export default function Comment({ replies = {} }) {
  const { _id } = useParams();
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => axios.get(`/posts/${_id}/`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  const repliesList = replies.map((item) => (
    <CommentItem key={item._id} item={item}></CommentItem>
  ));

  return (
    <section className="pt-5">
      <span className="font-semibold">댓글 ({replies.length})</span>
      {replies.length === 0 && (
        <div className="h-[85px] flex justify-center items-center">
          아직 댓글이 없습니다!
        </div>
      )}
      {replies.length !== 0 && repliesList}
    </section>
  );
}
