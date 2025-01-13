import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const useCategory = (product) => {
  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axios.get(
        `https://11.fesp.shop/codes/productCategory`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.item;
    },
  });

  const category = categoryData?.productCategory.codes.find(
    (item) => item.code === product.extra.category
  );

  return category?.value;
};
