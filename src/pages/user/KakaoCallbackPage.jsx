// 카카오 콜백 페이지에서 헤더 푸터가 필요한지

import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// 카카오 콜백 페이지라고 보통 표현을 하는지
export default function KakaoCallbackPage() {
  const [searchParms] = useSearchParams();
  const axios = useAxiosInstance();

  const kakaoLogin = useMutation({
    mutationFn: (code) =>
      axios.post(`/users/login/kakao`, {
        code: code,
        redirect_uri: `${window.location.origin}/users/login/kakao`,
        user: {},
      }),
    onSuccess: (res) => {
      console.log("성공:", res);
    },
    onError: (error) => {
      console.error("실패", error);
    },
  });

  useEffect(() => {
    // URL에서 인가코드 추출
    const code = searchParms.get("code");
    if (code) {
      kakaoLogin.mutate({ code });
    }
    // console.log("인가 코드: ", code);
    // 서버에 전송
    // 로그인 처리
    // 메인으로 리다이렉트
  }, [searchParms]);

  return <div> 카카오 로그인 처리중... </div>;
}
