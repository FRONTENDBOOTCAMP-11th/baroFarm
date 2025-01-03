import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HeaderIcon from "@components/HeaderIcon";
import Products from "@components/Products";

export default function CategoryPage() {
  const { category } = useParams(); // URL에서 카테고리 추출
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // React Query를 활용한 데이터 패칭
  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await axios.get(`https://11.fesp.shop/products`, {
        params: {
          custom: JSON.stringify({ "extra.category": category }),
        },
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      });
      console.log("API Response:", response.data); // 응답 데이터 로그
      return response.data.item;
    },
  });

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: `${category}`,
      rightChild: (
        <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
      ),
    });
  }, [category]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return <Products productsData={productsData} />;
}
