import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import HeaderIcon from "@components/HeaderIcon";

import Products from "@components/Products";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function BookmarkPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "찜한 상품",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const { data: likeItem } = useQuery({
    queryKey: ["like"],
    queryFn: async () => {
      const response = await axios.get(`https://11.fesp.shop/products`, {
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

  console.log(likeItem);
  console.log("Type of likeItem:", typeof likeItem);

  const likeProducts = likeItem
    ? Object.values(likeItem).filter(
        (item) => item && item.myBookmarkId !== undefined
      )
    : [];

  return <Products productsData={likeProducts} />;
}
