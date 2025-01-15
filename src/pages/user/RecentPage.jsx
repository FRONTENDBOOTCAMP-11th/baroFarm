import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";
import Products from "@components/Products";

export default function RecentPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "최근 본 상품",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const productsData = JSON.parse(sessionStorage.getItem("productData"));

  console.log(productsData);
  {
    return !!productsData ? (
      <Products productsData={productsData} />
    ) : (
      <p className="absolute translate-x-1/2 -transform-x-1/2">
        최근 본 상품이 없습니다.
      </p>
    );
  }
}
