import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HeaderIcon from "@components/HeaderIcon";
import Products from "@components/Products";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function CategoryPage() {
  const { category } = useParams();
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const categoryTitle = [
    { key: "fruit", label: "제철과일" },
    { key: "vegetable", label: "채소" },
    { key: "kimchi", label: "김치" },
    { key: "liveStock", label: "축산물" },
    { key: "seafood", label: "수산물" },
    { key: "simple", label: "간편식" },
    { key: "riceCake", label: "떡" },
    { key: "rice", label: "쌀 / 잡곡" },
  ];

  const categoryLabel =
    categoryTitle.find((item) => item.key === category)?.label || "카테고리";

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: categoryLabel,
      rightChild: (
        <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
      ),
    });
  }, [category]);

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
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data.item;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return <Products productsData={productsData} />;
}
