import PropTypes from "prop-types";

Comment.propTypes = {
  repliesCount: PropTypes.number.isRequired,
};

export default function Comment({ repliesCount }) {
  return (
    <section className="pt-5">
      <span className="font-semibold">댓글 ({repliesCount})</span>
      <div className="px-[15px] ">
        <div className="flex flex-row mt-5">
          <img
            src="/images/profile/Profile_sample_1.jpg"
            alt="ProfileImage"
            className="w-6 h-6 rounded-full border"
          />
          <span className="mx-[5px] text-sm">떡보369</span>
          <span className="text-[10px] mt-[6px] ml-auto text-gray4">
            3분 전
          </span>
        </div>
        <div className="flex pb-5 border-b-[1px] border-gray3/50">
          <div className="mt-3 text-xs text-gray5">
            와 보기만 해도 정말 맛있겠네요!
          </div>
          <span className="ml-auto text-xs mt-auto">
            <button>수정</button> | <button>삭제</button>
          </span>
        </div>
      </div>
    </section>
  );
}
