import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import Products from "@components/Products";

export default function SearchSeasonalPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  // 이전 페이지에서 보낸 제철 상품 데이터
  const location = useLocation();
  const seasonalProducts = location.state.filteredOnMonthData;

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "제철음식",
    });
  }, []);

  return <Products productsData={seasonalProducts} />;
}
