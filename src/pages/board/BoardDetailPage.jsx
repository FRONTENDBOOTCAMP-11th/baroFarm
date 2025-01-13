import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Comment from "@pages/board/Comment";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import {
  Link,
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
  const { user } = useUserStore();
  const axios = useAxiosInstance();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate("/board")} />,
      title: "게시글",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const { data, isLoading } = useQuery({
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

  const deletePost = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      const response = await axios.delete(`/posts/${_id}`);
      if (response.status === 200) {
        alert("게시글 삭제가 완료되었습니다.");
        navigate("/board");
      }
    }
  };

  return (
    <div className="mx-5">
      <div className="flex flex-row mt-5 items-center">
        <img
          src={`https://11.fesp.shop${data.user.image}`}
          alt="ProfileImage"
          className="w-6 h-6 rounded-full object-cover"
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
      {data.user._id === user?._id && (
        <div className="text-right text-xs">
          <Link to="edit" state={{ data: data }}>
            수정
          </Link>{" "}
          | <button onClick={deletePost}>삭제</button>
        </div>
      )}
      <Comment repliesCount={repliesCount} />

      <form className="h-[65px] flex items-center px-5 -mx-5">
        <input
          type="text"
          name="comment"
          className="max-w-[285px] h-[35px] rounded-full px-[15px] mr-5 bg-gray1 flex-grow focus:outline-btn-primary"
        />
        <Button width={45} height={35} onClick={() => navigate("/board")}>
          등록
        </Button>
      </form>
    </div>
  );
}
