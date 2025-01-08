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
      <Comment repliesCount={repliesCount} />

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
