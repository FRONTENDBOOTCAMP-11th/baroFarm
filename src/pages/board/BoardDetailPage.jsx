import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import Comment from "@pages/board/Comment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

export default function BoardDetailPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const newDate = location.state?.newDate;
  const repliesCount = location.state?.repliesCount;

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", _id],
    queryFn: () =>
      axios.get(`https://11.fesp.shop/posts/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      }),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  if (isLoading) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  return (
    <div className="mx-5">
      <div className="flex flex-row mt-5 items-center">
        <img
          src={`https://11.fesp.shop${data.user.image}`}
          alt="ProfileImage"
          className="w-6 h-6 rounded-full"
        />
        <span className="mx-[5px] text-sm">{data.user.name}</span>
        <span className="text-[10px] ml-auto self-start text-gray4">
          {newDate}
        </span>
      </div>
      <div className="mx-[5px] mt-[30px]">{data.content}</div>
      <img
        className="relative mt-10 mb-1 rounded-md"
        src={`https://11.fesp.shop${data.image}`}
      />
      <div className="text-right text-xs">
        <button>수정</button> | <button>삭제</button>
      </div>
      <div className="pt-5">
        <span className="font-semibold">댓글 ({repliesCount})</span>

        <Comment />
        <Comment />
        {/* <div className="px-[15px] ">
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
        <div className="px-[15px] ">
          <div className="flex flex-row mt-5">
            <img
              src="/images/profile/Profile_sample_2.jpg"
              alt="ProfileImage"
              className="w-6 h-6 rounded-full border"
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
        </div> */}
      </div>

      <div className="h-[65px] flex items-center px-5 -mx-5">
        <input
          type="text"
          name="comment"
          className="max-w-[285px] h-[35px] rounded-full px-[15px] mr-5 bg-gray1 flex-grow focus:outline-btn-primary"
        />
        <Button width={45} height={35} onClick={() => navigate("/board")}>
          등록
        </Button>
      </div>
    </div>
  );
}
