import { useNavigate, useOutletContext } from "react-router-dom";

import productImage1 from "/images/Sample1.svg";
import productImage2 from "/images/Sample2.svg";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import Products from "@components/Products";

const productsData = [
  {
    id: 1,
    image: productImage1,
    title: "온도감",
    content: "촉촉함이 다른 카스테라 5종...",
    sale: "92%",
    price: "14,900원",
    rate: "⭐️ 4.9",
    review: "(2,210)",
  },
  {
    id: 2,
    image: productImage2,
    title: "강아지",
    content: "강아지 귀여워",
    sale: "12%",
    price: "24,900원",
    rate: "⭐️ 3.9",
    review: "(6,210)",
  },
  {
    id: 3,
    image: productImage1,
    title: "햄스터",
    content: "햄스터 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
  {
    id: 4,
    image: productImage2,
    title: "강아지",
    content: "강아지 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
  {
    id: 5,
    image: productImage1,
    title: "햄스터",
    content: "햄스터 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
  {
    id: 6,
    image: productImage2,
    title: "강아지",
    content: "강아지 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
];

export default function SearchNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "신상품",
    });
  }, []);

  return <Products productsData={productsData} />;
}
