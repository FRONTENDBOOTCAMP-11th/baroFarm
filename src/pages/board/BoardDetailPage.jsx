import { useParams } from "react-router-dom";

export default function BoardDetailPage() {
  const { _id } = useParams();

  return (
    <div className="relative mx-5">
      <div className="relative">
        <div className="flex flex-row mt-5">
          <img
            src="/images/ProfileImage_Sample.svg"
            alt="ProfileImage"
            className="w-6 h-6"
          />
          <span className="mx-[5px] text-sm">온도감</span>
          <span className="text-[10px] mt-[6px] text-gray4">16분 전</span>
          <span className="ml-auto text-xs">
            <button>수정</button> | <button>삭제</button>
          </span>
        </div>
        <div className="mx-[5px] mt-[30px]">
          요즘 토마토가 또 철이네요~ 우리 집에서 기른 토마토로 만든 소스로
          스파게티를 해보니 정말 일품이네요! 모두와 함께 공유하고 싶어 이렇게
          글을 올립니다~
        </div>
        <img
          className="relative mt-10 w-[calc(100%+40px)] max-w-[390px] -translate-x-5"
          src="/images/BoardImage_Sample.svg"
        />
      </div>
      <div className="bg-red-200">
        <span className="mt-5 font-semibold">댓글 (1)</span>
        <div className="px-[15px]">
          <div className="flex flex-row mt-5">
            <img
              src="/images/ProfileImage_Sample.svg"
              alt="ProfileImage"
              className="w-6 h-6"
            />
            <span className="mx-[5px] text-sm">떡보369</span>
            <span className="text-[10px] mt-[6px] ml-auto text-gray4">
              15분 전
            </span>
          </div>
          <div className="flex mb-5">
            <div className="mt-3 text-xs text-gray5">
              와 보기만 해도 정말 맛있겠네요!
            </div>
            <span className="ml-auto text-xs mt-auto">
              <button>수정</button> | <button>삭제</button>
            </span>
          </div>
        </div>
      </div>
      <div className="h-[7px] bg-gray1 -mx-5 mb-80"></div>
    </div>
  );
}
