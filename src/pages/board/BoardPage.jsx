export default function BoardPage() {
  return (
    <div className="bg-red-300 max-w-[390px]">
      <div className="flex flex-row h-[50px] ml-[-20px] w-[390px] bg-blue-100">
        <div className="flex w-[120px] justify-center items-center border-r-[1px] border-gray3/50">
          자유
        </div>
        <div className="flex w-[120px] justify-center items-center border-r-[1px] border-gray3/50">
          정보 공유
        </div>
      </div>
      <div>
        <div className="h-[7px] bg-gray1 ml-[-20px] w-[390px]"></div>
        <div className="flex flex-row">user info</div>
        <div>post content</div>
        <div>media</div>
      </div>
    </div>
  );
}
