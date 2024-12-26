import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BoardDetailPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "게시글",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  return (
    <div className="mx-5">
      <div>
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
          className="relative mt-10 w-[calc(100%+40px)] max-w-[390px] -translate-x-5 -z-50"
          src="/images/BoardImage_Sample.svg"
        />
      </div>
      <div className="pt-5">
        <span className="font-semibold">댓글 (2)</span>
        <div className="px-[15px] ">
          <div className="flex flex-row mt-5">
            <img
              src="/images/ProfileImage_Sample.svg"
              alt="ProfileImage"
              className="w-6 h-6"
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
        <div className="px-[15px] ">
          <div className="flex flex-row mt-5">
            <img
              src="/images/ProfileImage_Sample.svg"
              alt="ProfileImage"
              className="w-6 h-6"
            />
            <span className="mx-[5px] text-sm">삼행시 빌런</span>
            <span className="text-[10px] mt-[6px] ml-auto text-gray4">
              15분 전
            </span>
          </div>
          <div className="flex pb-5 border-b-[1px] border-gray3/50">
            <div className="mt-3 text-xs text-gray5">
              토: 토마토
              <br />
              마: 마지막으로 말하지만
              <br />
              토: 토-메이-토입니다
            </div>
            <span className="ml-auto text-xs mt-auto">
              <button>수정</button> | <button>삭제</button>
            </span>
          </div>
        </div>
      </div>

      <div className="h-[65px] flex items-center px-5 -mx-5">
        <input
          type="text"
          name="comment"
          className="max-w-[285px] h-[35px] rounded-full px-[15px] mr-5 bg-gray1 flex-grow"
        />
        <Button width={45} height={35} onClick={() => navigate("/board")}>
          등록
        </Button>
      </div>
    </div>
  );
}
