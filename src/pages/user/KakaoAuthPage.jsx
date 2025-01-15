import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";

export default function KakaoAuthPage() {
  const [searchParms] = useSearchParams();
  const axios = useAxiosInstance();
  const setUser = useUserStore((store) => store.setUser);
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 헤더 설정은 컴포넌트 마운트 시에만 실행
  useEffect(() => {
    setHeaderContents({
      title: "카카오 로그인",
    });
  }, []);

  // URL에서 인가코드를 추출하여 카카오 로그인 요청
  useEffect(() => {
    // 1. URL 파라미터에서 인가코드 가져오기
    const code = searchParms.get("code");
    // 2. 인가코드가 있으면 카카오 로그인 mutation 실행
    if (code) {
      kakaoLogin.mutate(code);
    }
  }, [searchParms]);

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
          userName: "이름을 등록해주세요",
          accessToken: user.token.accessToken,
          refreshToken: user.token.refreshToken,
        });

        // alert(user.name + "님, 로그인 되었습니다.");
        // navigate("/");
      }
    },
    onError: (error) => {
      console.error("카카오 로그인 실패", error);
    },
  });

  if (kakaoLogin.isLoading) {
    return <p>카카오 로그인 처리중</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4">로그인 처리 중 오류가 발생했습니다.</p>
      <p className="mb-4">로그인 페이지로 이동합니다...</p>
      <button onClick={() => navigate("/users/login")} className="text-btn-primary underline">
        바로 로그인 페이지로 이동
      </button>
    </div>
  );
}
