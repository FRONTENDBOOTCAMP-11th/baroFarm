import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import Products from "@components/Products";

export default function SearchBestPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  // 이전 페이지에서 보낸 베스트 상품 데이터
  const location = useLocation();
  const bestProducts = location.state.sortedBestData;

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "인기 상품",
    });
  }, []);

  return <Products productsData={bestProducts} />;
}
