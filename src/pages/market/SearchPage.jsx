import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SearchPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate("/")} />,
      title: "검색",
    });
  }, []);

  return (
    <div className="p-5">
      {/* 검색창 */}
      <form>
        <label htmlFor="search" className="text-sm font-semibold block mb-2">
          찾으시는 상품이 있으신가요?
        </label>
        <div className="flex items-center gap-1 w-full rounded-md p-1 border-2 border-gray3 focus-within:border-green1">
          <button type="submit" aria-label="검색하기">
            <img src="/icons/icon_search.svg" alt="" />
          </button>
          <input
            className="flex-grow border-none outline-none
              [&::-webkit-search-cancel-button]:appearance-none
              [&::-webkit-search-cancel-button]:bg-[url('/icons/icon_x_black.svg')]
              [&::-webkit-search-cancel-button]:bg-center
              [&::-webkit-search-cancel-button]:h-4
              [&::-webkit-search-cancel-button]:w-4"
            type="search"
            placeholder="검색어를 입력해주세요"
            id="search"
            name="keyword"
          />
        </div>
      </form>
      {/* 최근 검색어 */}
      <div className="flex items-center mt-2.5">
        <h5 className="flex-grow text-sm font-semibold">최근 검색어</h5>
        <button className="text-xs font-medium" type="button">
          전체 삭제
        </button>
      </div>

      <ul className="mt-2.5 flex items-center flex-wrap gap-2.5 text-sm">
        <li className="bg-gray2 px-3 rounded-xl">
          <a className="hover:font-semibold" href="#">
            귤
          </a>
        </li>
        <li className="bg-gray2 px-3 rounded-xl">
          <a className="hover:font-semibold" href="#">
            갈치
          </a>
        </li>
        <li className="bg-gray2 px-3 rounded-xl">
          <a className="hover:font-semibold" href="#">
            고랭지배추
          </a>
        </li>
      </ul>
    </div>
  );
}
