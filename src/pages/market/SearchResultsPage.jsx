// React와 라우터 관련
import { useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";

// 컴포넌트
import HeaderIcon from "@components/HeaderIcon";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Products from "@components/Products";

export default function SearchResultsPage() {
  // URL의 쿼리 파라미터를 가져오기
  const [searchParams] = useSearchParams();
  // URL 쿼리 파라미터에서 "keyword" 값을 추출 (예: ?keyword=귤 → "귤")
  const keyword = searchParams.get("keyword");
  const axios = useAxiosInstance();

  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate("/search")} />,
      title: keyword,
    });
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchProducts", keyword],
    queryFn: () => axios.get("/products", { params: { keyword: keyword } }),
    select: (res) => res.data.item,
    staleTime: 1000 * 60, // 1분
  });

  // /search/results(URL)로 직접 접근했을 때 키워드가 없으면 검색 페이지로 리다이렉트
  useEffect(() => {
    if (!keyword) {
      navigate("/search");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }
  if (isError) {
    return (
      <div className="mt-0 mx-auto text-center">
        에러가 발생했습니다. <br />
        잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div>
      <div className="p-5 flex items-center font-semibold">
        <h2>총 {data.length}개</h2>
        <div className="ml-auto text-sm">
          <select
            className=" text-center bg-gray2 rounded-lg py-1 ps-3 pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem]"
            defaultValue="maxPrice"
            aria-label="정렬 기준 선택"
            name="sort"
          >
            <option value="maxPrice">높은 가격순</option>
            <option value="minPrice">낮은 가격순</option>
            <option value="rating">평점순</option>
            <option value="replies">후기 개수순</option>
            <option value="createdAt">최신순</option>
            <option value="buyQuantity">판매 수량순</option>
          </select>
        </div>
      </div>
      {/* 검색 결과 없을 때와 있을 때의 조건부 렌더링 */}
      {data.length === 0 ? (
        <div className="p-5 text-sm text-center font-medium mt-3">
          <img className="block m-auto mb-2" src="/icons/icon_sad.svg" alt="검색 결과 없음을 나타내는 슬픈 표정" />
          <p>입력하신 검색어의 결과를 찾을 수 없습니다.</p>
          <p>다른 검색어로 시도하시거나 맞춤법을 확인해주세요.</p>
        </div>
      ) : (
        <Products productsData={data} />
      )}
    </div>
  );
}
