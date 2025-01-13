import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentItem from "@pages/board/CommentItem";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

Comment.propTypes = {
  repliesCount: PropTypes.number.isRequired,
};

export default function Comment({ repliesCount }) {
  const { _id } = useParams();
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => axios.get(`/posts/${_id}/`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  return (
    <section className="pt-5">
      <span className="font-semibold">댓글 ({repliesCount})</span>
      {!repliesCount && (
        <div className="h-[85px] flex justify-center items-center">
          아직 댓글이 없습니다!
        </div>
      )}
      {repliesCount && (
        <>
          <CommentItem />
          <CommentItem />
        </>
      )}
    </section>
  );
}
