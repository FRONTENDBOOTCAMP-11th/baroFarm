import PropTypes from "prop-types";
import { Link } from "react-router-dom";

BoardPageDetail.propTypes = {
  item: PropTypes.shape(),
};

export default function BoardPageDetail({ item }) {
  const createdTime = (createdDate) => {
    const formatRelativeTime = (inputDate) => {
      const now = new Date();
      const pastDate = new Date(inputDate);
      // 밀리초를 분 단위로 변환
      const minDiff = Math.floor((now - pastDate) / (1000 * 60));
      console.log(minDiff);

      if (minDiff < 1) return "방금 전";
      if (minDiff <= 30) return `${minDiff}분 전`;

      // 30분 이상인 경우에는 그냥 시간을 표시
      return pastDate.toLocaleString(); // 예: "2025.01.03 15:28:45"
    };

    return formatRelativeTime(createdDate);
  };
  return (
    <div className="relative">
      <Link to={"1"}>
        <div className="flex flex-row mt-5 items-center">
          <img
            src={`https://11.fesp.shop${item.user.image}`}
            alt="ProfileImage"
            className="w-6 h-6 rounded-full"
          />
          <span className="mx-[5px] text-sm">{item.user.name}</span>

          <span className="ml-auto text-xs self-start">
            댓글 {item.repliesCount}개
          </span>
        </div>
        <div className="mx-[5px] mt-[30px]">{item.content}</div>
        <img
          className="relative mt-10 rounded-md"
          src={`https://11.fesp.shop${item.image}`}
        />
        <div className="text-[10px] text-gray4 text-right mb-5 mt-1">
          {createdTime(item.createdAt)}
        </div>
      </Link>
      <div className="h-[7px] bg-gray1 -mx-5"></div>
    </div>
  );
}
