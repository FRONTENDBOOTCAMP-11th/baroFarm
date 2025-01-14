import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

function App() {
  // 카카오 SDK 초기화
  // - 카카오 로그인 등의 기능을 사용하기 위해 필수적인 과정
  // - 앱 시작 시 최초 1회만 실행되어야 함
  useEffect(() => {
    // SDK가 초기화되지 않은 경우에만 초기화 진행
    // window.Kakao를 사용하는 이유
    // - React 컴포넌트(.jsx) 파일은 독립적인 공간을 가지고 있어서
    // - index.html에서 추가한 카카오 SDK를 바로 찾을 수 없음
    // - window(브라우저 전역 객체)를 통해 카카오 SDK에 접근해야 함
    if (!window.Kakao.isInitialized()) {
      // VITE_KAKAO_JS_KEY: 카카오 Developer에서 발급받은 JavaScript 키
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      console.log("카카오 초기화 여부: ", window.Kakao.isInitialized());
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </HelmetProvider>
    </>
  );
}

export default App;
