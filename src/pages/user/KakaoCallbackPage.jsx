import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

export default function KakaoAuthPage() {
  const [searchParms] = useSearchParams();
  const axios = useAxiosInstance();
  const setUser = useUserStore((store) => store.setUser);

  const { setHeaderContents } = useOutletContext();
  // 헤더 설정은 컴포넌트 마운트 시에만 실행
  useEffect(() => {
    setHeaderContents({
      title: "카카오 로그인",
    });
  }, []);

  const kakaoLogin = useMutation({
    mutationFn: (code) =>
      axios.post(`/users/login/kakao`, {
        code: code,
        redirect_uri: `${window.location.origin}/users/login/kakao`,
        user: {},
      }),
    onSuccess: (res) => {
      if (res.data.item) {
        console.log("카카오 로그인 성공:", res);

        const user = res.data.item;
        setUser({
          _id: user._id,
          name: user.name,
          userName: user.name,
          accessToken: user.token.accessToken,
          refreshToken: user.token.refreshToken,
        });
      }
    },
    onError: (error) => {
      console.error("카카오 로그인 실패", error);
    },
  });

  useEffect(() => {
    // URL에서 인가코드 추출
    const code = searchParms.get("code");
    if (code) {
      kakaoLogin.mutate(code);
    }
    // console.log("인가 코드: ", code);
    // 서버에 전송
    // 로그인 처리
    // 메인으로 리다이렉트
  }, [searchParms]);

  return <div> 카카오 로그인 처리중... </div>;
}
