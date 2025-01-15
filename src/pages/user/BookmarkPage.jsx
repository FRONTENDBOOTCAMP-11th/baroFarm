import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

import HeaderIcon from "@components/HeaderIcon";
import Products from "@components/Products";

export default function BookmarkPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const instance = useAxiosInstance();
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
      const response = await instance.get(`/products`);
      return response.data.item;
    },
  });

  const likeProducts = !!likeItem
    ? Object.values(likeItem).filter(
        (item) => item && item.myBookmarkId !== undefined
      )
    : [];

  return <Products productsData={likeProducts} />;
}
