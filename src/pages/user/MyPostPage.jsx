import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";
import BoardPageDetail from "@pages/board/BoardPageDetail";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function MyPost() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const myPosts = useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "내가 작성한 글",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const { data: communityBoard, isLoading } = useQuery({
    queryKey: ["myPosts", "community"],
    queryFn: () =>
      axios.get(`/posts/users`, {
        params: { type: "community" },
      }),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  // 사진을 포함하지 않은 게시글
  const { data: noPicBoard, isLoading: isLoading2 } = useQuery({
    queryKey: ["myPosts", "noPic"],
    queryFn: () =>
      axios.get(`/posts/users`, {
        params: { type: "noPic" },
      }),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  if (isLoading || isLoading2) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  const mergeData = [...communityBoard, ...noPicBoard];
  const sortedData = mergeData.sort((prev, next) => next._id - prev._id);

  const groupedData = sortedData.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString(); // 날짜만 추출 (YYYY.MM.DD)
    if (!acc[date]) acc[date] = []; // 날짜 키가 없으면 생성
    acc[date].push(item); // 날짜 키에 데이터 추가
    return acc;
  }, {});
  const groupedArray = Object.entries(groupedData).map(([date, items]) => ({
    date,
    items,
  }));

  console.log(groupedArray);

  const myBoardList = groupedArray.map((data) => {
    return (
      <div key={data.date} className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">
          {data.date} 에 작성된 글 ({data.items.length})
        </p>
        {data.items.map((item) => (
          <BoardPageDetail key={item._id} item={item} />
        ))}
      </div>
    );
  });

  return (
    <>
      {myBoardList}
      {myBoardList.length === 0 && (
        <span className="mt-10 block text-center text-gray4">
          작성하신 글이 없습니다.
        </span>
      )}
    </>
  );
}
