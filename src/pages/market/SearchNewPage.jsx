import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import Products from "@components/Products";

export default function SearchNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  // 이전 페이지에서 보낸 신상품 데이터
  const location = useLocation();
  const newProducts = location.state.filteredNewData;
  console.log(newProducts);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "신상품",
    });
  }, []);

  return <Products productsData={newProducts} />;
}
