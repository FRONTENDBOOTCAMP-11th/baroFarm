import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function HeaderIcon({ name, onClick }) {
  // 로그인한 유저 정보
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  // 장바구니가 차 있는지 아닌지 확인하는 상태관리 변수
  const [isFullCart, setIsFullCart] = useState(false);

  // 장바구니 아이콘에 상품 개수를 표시하기 위한 장바구니 상품 목록 조회
  const { data } = useQuery({
    queryKey: ["carts"],
    queryFn: () => axios.get("https://11.fesp.shop/carts"),
    select: (res) => res.data,
    enabled: !!user, // `user`가 존재할 때만 쿼리를 실행
    staleTime: 1000 * 10,
  });

  const iconPath = `/icons/icon_${name}.svg`;

  // 장바구니 아이콘이고, 장바구니가 차 있으면 상태를 변경
  useEffect(() => {
    if (data && name.startsWith("cart") && data.item.length > 0) {
      setIsFullCart(true);
    }
  }, [data]);

  return (
    <button onClick={onClick} className="relative">
      <img src={iconPath} className="size-[34px]" />
      {isFullCart && (
        <span className="flex justify-center items-center text-xs text-white absolute size-4 bg-red1 rounded-full right-0 top-0">
          {data.item.length}
        </span>
      )}
    </button>
  );
}
