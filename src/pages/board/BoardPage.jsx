import BoardPageDetail from "@pages/board/BoardPageDetail";

export default function BoardPage() {
  return (
    <div className="relative">
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
    </div>
  );
}
