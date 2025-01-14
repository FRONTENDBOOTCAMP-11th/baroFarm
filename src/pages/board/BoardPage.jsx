import HeaderIcon from "@components/HeaderIcon";
import useAxiosInstance from "@hooks/useAxiosInstance";
import BoardPageDetail from "@pages/board/BoardPageDetail";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function BoardPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const axios = useAxiosInstance();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: `바로파밍`,
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["posts", "community"],
    queryFn: () =>
      axios.get(`/posts`, {
        params: { type: "community", keyword: keyword },
      }),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  const { data: data2, isLoading } = useQuery({
    queryKey: ["posts", "noPic"],
    queryFn: () =>
      axios.get(`/posts`, {
        params: { type: "noPic", keyword: keyword },
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

  const mergeData = [...data, ...data2];
  const sortedData = mergeData.sort((prev, next) => next._id - prev._id);

  const handleClick = (event) => {
    if (
      !confirm(
        "게스트 상태로 게시글 작성을 이용하실 수 없습니다.\n로그인 하시겠습니까?"
      )
    ) {
      event.preventDefault();
    }
  };

  const searchKeyword = (e) => {
    // 폼에서 name="keyword"인 입력값을 가져와 앞뒤 공백 제거
    const searchWord = e.target.keyword.value.trim();
    setKeyword(searchWord);
    console.log(keyword);
  };

  const boards = sortedData?.map((item) => (
    <BoardPageDetail key={item._id} item={item} />
  ));

  return (
    <div className="relative mx-5">
      <form className="pt-2" onSubmit={searchKeyword}>
        <label htmlFor="search" className="text-sm font-semibold block mb-2">
          게시판 검색
        </label>
        <div className="flex items-center gap-1 w-full rounded-md p-1 border border-gray3 focus-within:border-btn-primary">
          <button type="submit" aria-label="검색하기">
            <img src="/icons/icon_search.svg" alt="" />
          </button>
          <input
            className="flex-grow border-none outline-none
              [&::-webkit-search-cancel-button]:appearance-none
              [&::-webkit-search-cancel-button]:bg-[url('/icons/icon_x_thin.svg')]
              [&::-webkit-search-cancel-button]:bg-center
              [&::-webkit-search-cancel-button]:h-4
              [&::-webkit-search-cancel-button]:w-4"
            type="search"
            placeholder="키워드를 입력해주세요"
            id="search"
            name="keyword"
            maxLength={20}
          />
        </div>
      </form>
      <div className="flex my-2 items-center bg-green1 rounded-md">
        <img
          src="/images/BaroFarmLogo.svg"
          alt="바로팜 로고"
          className="w-[90px]"
        />
        <p className="text-white text-sm break-keep">
          바로파밍은 모든 이용자들을 위한
          <span className="text-btn-primary"> 소통</span>의 공간입니다.
          <br /> 매너를 지키는 바로팜인이 됩시다!
        </p>
      </div>

      <div className="h-[7px] bg-gray1 -mx-5"></div>
      {boards}
      <Link
        to={isLogin ? "new" : "/users/login"}
        onClick={!isLogin ? (event) => handleClick(event) : null}
        className="fixed right-[calc(50%-155px)] bottom-[130px] w-[40px] h-[40px] rounded-full shadow-bottom"
      >
        <img src="/icons/icon_newpost.svg" className="w-full h-full" />
      </Link>
    </div>
  );
}
