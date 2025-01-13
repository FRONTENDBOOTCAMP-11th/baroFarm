import { useEffect, useRef, useState } from "react";

export default function PostcodeSearch() {
  // 주소 검색 iframe 오픈 상태
  const [isOpenIfram, setIsOpenIfram] = useState(false);
  // 주소 검색 iframe에 접근
  const iframeRef = useRef(null);
  // 다이나믹 하게 스크립트 추가
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 메모리 누수 방지를 위해 컴포넌트 언마운트시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 주소 입력 iframe을 실행할 함수
  function execDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log("주소 검색 결과:", data);
      },
      width: "100%",
      height: "100%",
    }).embed(iframeRef.current);
    setIsOpenIfram(true);
  }

  return (
    <div>
      <input type="text" id="postcode" placeholder="우편번호" />
      <input
        type="button"
        onClick={() => execDaumPostcode()}
        value="우편번호 찾기"
      />
      <br />
      <input type="text" id="address" placeholder="주소" />
      <br />
      <input type="text" id="detailAddress" placeholder="상세주소" />
      <input type="text" id="extraAddress" placeholder="참고항목" />

      <div
        id="wrap"
        ref={iframeRef}
        className={`bg-red-100 border border-solid w-auto h-[300px] my-1 relative ${
          isOpenIfram ? "visible" : "hidden"
        }`}
      >
        <img
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          id="btnFoldWrap"
          className="cursor-pointer absolute right-0 top-0 z-10"
          onClick={() => setIsOpenIfram(false)}
          alt="접기 버튼"
        />
      </div>
    </div>
  );
}
