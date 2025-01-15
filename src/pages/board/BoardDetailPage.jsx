import HeaderIcon from "@components/HeaderIcon";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Comment from "@pages/board/Comment";
import createdTime from "utils/createdTime";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

export default function BoardDetailPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { user } = useUserStore();
  const axios = useAxiosInstance();

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

  const { data, isLoading } = useQuery({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  if (isLoading) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중..... <br />
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

  const newDate = createdTime(data.createdAt);

  return (
    <div className="mx-5">
      <div className="flex flex-row mt-5 items-center">
        <img
          src={
            data.user.image
              ? `https://11.fesp.shop${data.user.image}`
              : "/images/profile/ProfileImage_Sample.svg"
          }
          alt="ProfileImage"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="mx-[5px] text-sm">{data.user.name}</span>
        <span className="text-[10px] ml-auto self-start text-gray4">
          {newDate}
        </span>
      </div>
      <div className="mx-[5px] mt-[30px]">{data.content}</div>
      {data.image && (
        <img
          className="relative mt-10 mb-1 rounded-md"
          src={`https://11.fesp.shop${data.image}`}
        />
      )}
      {data.user._id === user?._id && (
        <div className="text-right text-xs">
          <Link to="edit" state={{ data: data }}>
            수정
          </Link>{" "}
          | <button onClick={deletePost}>삭제</button>
        </div>
      )}
      <Comment replies={data.replies} />
    </div>
  );
}
