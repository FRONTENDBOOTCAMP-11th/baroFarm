import { Link } from "react-router-dom";

export default function BoardPageDetail() {
  return (
    <div className="relative">
      <div className="h-[7px] bg-gray1 -mx-5"></div>
      <Link to={"1"}>
        <div className="flex flex-row mt-5">
          <img
            src="/images/profile/Profile_sample_1.jpg"
            alt="ProfileImage"
            className="w-6 h-6 rounded-full"
          />
          <span className="mx-[5px] text-sm">온도감</span>
          <span className="text-[10px] mt-[1px] text-gray4">16분 전</span>
          <span className="ml-auto text-xs">댓글 1개</span>
        </div>
        <div className="mx-[5px] mt-[30px]">
          요즘 토마토가 또 철이네요~ 우리 집에서 기른 토마토로 만든...
        </div>
        <img
          className="relative mt-10 mb-5 rounded-md"
          src="/images/sample/food.svg"
        />
      </Link>
    </div>
  );
}
