import CommentItem from "@pages/board/CommentItem";
import PropTypes from "prop-types";

Comment.propTypes = {
  repliesCount: PropTypes.number.isRequired,
};

export default function Comment({ repliesCount }) {
  return (
    <section className="pt-5">
      <span className="font-semibold">댓글 ({repliesCount})</span>
      {!repliesCount && (
        <div className="h-[85px] flex justify-center items-center">
          아직 댓글이 없습니다!
        </div>
      )}
      {/* <CommentItem />
      <CommentItem /> */}
    </section>
  );
}
