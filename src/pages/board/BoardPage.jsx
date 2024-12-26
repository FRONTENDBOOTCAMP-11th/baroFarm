import BoardPageDetail from "@pages/board/BoardPageDetail";
import { Link } from "react-router-dom";

export default function BoardPage() {
  return (
    <div className="relative mx-5">
      <div className="flex flex-row h-[50px] mx-[-20px] max-w-[calc(100%+40px)] ">
        <div className="flex w-full max-w-[120px] justify-center text-sm items-center border-r-[1px] border-gray3/50">
          자유
        </div>
        <div className="flex w-full max-w-[120px] justify-center text-sm items-center border-r-[1px] border-gray3/50">
          정보 공유
        </div>
      </div>
      <BoardPageDetail />
      <BoardPageDetail />
      <Link
        to="new"
        className="fixed right-[calc(50%-195px+20px)] bottom-[120px] w-[50px] h-[50px] rounded-full bg-gray5"
      >
        <img src="/icons/icon_plus_2.svg" className="w-full h-full" />
      </Link>
    </div>
  );
}
