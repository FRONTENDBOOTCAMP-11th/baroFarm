import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

BoardPageDetail.propTypes = {
  item: PropTypes.shape(),
};

export default function BoardPageDetail({ item }) {
  const containerRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setIsOverflow(scrollHeight > clientHeight); // 높이 비교
      }
    };
    checkOverflow();
  }, []);

  const createdTime = (createdDate) => {
    const formatRelativeTime = (inputDate) => {
      const now = new Date();
      const pastDate = new Date(inputDate);
      const minDiff = Math.floor((now - pastDate) / (1000 * 60));
      if (minDiff < 1) return "방금 전";
      if (minDiff < 60) return `${minDiff}분 전`;
      if (minDiff < 1440) return `${parseInt(minDiff / 60)}시간 전`;
      if (minDiff < 2880) return `${parseInt(minDiff / 1440)}일 전`;

      // 이틀 이상인 경우에는 날짜를 표시
      return pastDate.toLocaleString();
    };

    return formatRelativeTime(createdDate);
  };

  const newDate = createdTime(item.createdAt);
  return (
    <div className="relative">
      <Link
        to={`${item._id}`}
        state={{ newDate, repliesCount: item.repliesCount }}
      >
        <div
          ref={containerRef}
          className="max-h-[550px] overflow-hidden relative"
        >
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
          {isOverflow && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="text-[10px] text-gray4 text-left mb-5 mt-1">
          {newDate}
        </div>
      </Link>
      <div className="h-[7px] bg-gray1 -mx-5"></div>
    </div>
  );
}
