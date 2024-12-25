export default function BoardPage() {
  return (
    <div className="bg-red-300 max-w-[390px]">
      <div className="flex flex-row h-[50px] ml-[-20px] w-[390px] bg-blue-100">
        <div className="flex w-[120px] justify-center text-sm items-center border-r-[1px] border-gray3/50">
          자유
        </div>
        <div className="flex w-[120px] justify-center text-sm items-center border-r-[1px] border-gray3/50">
          정보 공유
        </div>
      </div>
      <div>
        <div className="h-[7px] bg-gray1 ml-[-20px] w-[390px]"></div>
        <div className="flex flex-row mt-5">
          <img
            src="../../../../public/images/ProfileImage_Sample.svg"
            alt="ProfileImage"
            className="w-6 h-6"
          />
          <span className="mx-[5px] text-sm">온도감</span>
          <span className="text-[10px] mt-[6px] text-gray4">16분 전</span>
          <span className="ml-auto text-xs">댓글 1개</span>
        </div>
        <div className="mx-[5px] mt-[30px]">
          요즘 토마토가 또 철이네요~ 우리 집에서 기른 토마토로 만든...
        </div>
        <div className="mt-10">media</div>
      </div>
    </div>
  );
}
