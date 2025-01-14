import CryptoJS from "crypto-js";
import HeaderIcon from "@components/HeaderIcon";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function LoginPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 로그인 정보 저장
  const [rememberMe, setRememberMe] = useState(false);
  // 환경변수에서 시크릿 키 가져오기
  const SECRET_PW_KEY = import.meta.env.VITE_SECRET_PW_KEY;

  // 헤더 설정은 컴포넌트 마운트 시에만 실행
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back_thin" onClick={() => navigate("/")} />,
      title: "로그인",
    });
  }, []);

  // Zustand store에서 user 상태를 가져옴
  const user = useUserStore((store) => store.user);
  // 로그인된 사용자가 /login 페이지에 접근하는 것을 방지
  // - user가 null인 경우: 로그인되지 않은 상태 => 로그인 페이지 유지
  // - user가 객체인 경우: 이미 로그인된 상태 => 메인 페이지로
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");

    // 저장된 데이터가 존재하는 경우
    if (savedUserInfo) {
      const { email, password: encryptedPW } = JSON.parse(savedUserInfo);
      // 암호화된 비밀번호 복호화
      const decryptedPW = CryptoJS.AES.decrypt(encryptedPW, SECRET_PW_KEY).toString(CryptoJS.enc.Utf8);

      setValue("email", email); // 이메일 입력란에 저장된 이메일 설정
      setValue("password", decryptedPW); // 비밀번호 입력란에 저장된 비밀번호 설정
      setRememberMe(true); // 로그인 정보 저장 체크박스를 체크 상태로 설정
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues, // 현재 폼에 입력된 값들을 가져오는 함수
    setValue, // 폼 입력 필드에 값을 직접 설정하는 함수
    reset, // 폼의 초기값을 설정하거나 입력 필드의 값을 초기화하는 함수
  } = useForm({ mode: "onBlur" });

  // store는 zustand에서 상태(state)객체를 나타내기 위해 관용적으로 사용하는 이름
  const setUser = useUserStore((store) => store.setUser);
  const axios = useAxiosInstance();
  const login = useMutation({
    mutationFn: (formData) => axios.post("/users/login", formData),
    onSuccess: (res) => {
      // console.log(res);

      // 로그인 성공 시 유저 정보를 zustand 스토어에 저장
      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        userName: user.extra.userName,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      alert(user.name + "님, 로그인 되었습니다.");

      // 자동 로그인이 체크되어 있는 경우에만 실행
      if (rememberMe) {
        // 비밀번호 암호화
        const encryptedPW = CryptoJS.AES.encrypt(getValues().password, SECRET_PW_KEY).toString();
        // 로컬스토리지에 저장할 객체 생성 (이메일은 평문, 비밀번호는 암호화)
        const userInfo = {
          email: getValues().email,
          password: encryptedPW, // 암호화된 비밀번호 저장
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

      // location.state?.from: 로그인이 필요한 페이지에서 전달받은 리다이렉트 경로
      // ⭐️ 로그인이 필요한 페이지에서는 navigate('/users/login', { state: { from: 현재경로 } })로 전달해야 함
      // 전달받은 경로가 있으면 해당 페이지로, 없으면 메인("/")으로 이동
      navigate(location.state?.from || "/");
    },
    onError: (err) => {
      console.error("로그인 에러:", err);
      // 422: 입력값 검증 오류
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) => setError(error.path, { message: error.msg }));
      } else {
        // 403:로그인 실패, 500:서버 에러
        alert(err.response?.data.message || "잠시후 다시 요청하세요.");
      }
    },
  });

  return (
    <div className="p-5">
      {/* 로고 영역 */}
      <div className="m-auto w-[300px] h-[300px]">
        <img className="block w-full" src="/images/Logo1_old.svg" alt="바로팜 로고 이미지" />
      </div>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit(login.mutate)}>
        <div className="border-b-2 border-gray2 mb-8 focus-within:border-b-btn-primary">
          <input
            type="email"
            placeholder="이메일"
            className="placeholder:text-gray4 w-full outline-none"
            {...register("email", { required: "이메일은 필수입니다." })}
          />
        </div>
        {errors.email && <p className="text-red1 text-xs -mt-7 mb-4">{errors.email.message}</p>}
        <div className="border-b-2  border-gray2 mb-4 focus-within:border-b-btn-primary">
          <input
            type="password"
            placeholder="비밀번호"
            className="placeholder:text-gray4 w-full outline-none"
            {...register("password", { required: "비밀번호는 필수입니다." })}
          />
        </div>
        {errors.password && <p className="text-red1 text-xs -mt-3 mb-4">{errors.password.message}</p>}
        <label className="mb-8 flex items-center gap-1 font-normal">
          <input
            className="w-5 h-5 mr-1 rounded-full appearance-none bg-gray2  bg-[url('/icons/icon_check_white.svg')] bg-center bg-no-repeat  checked:bg-btn-primary checked:bg-[url('/icons/icon_check_white.svg')] checked:bg-center checked:bg-no-repeat cursor-pointer "
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked);
              // 체크 해제 시
              if (!e.target.checked) {
                reset({ email: "", password: "" }); // 폼 필드 초기화
                localStorage.removeItem("userInfo"); // 로컬 스토리지 데이터 삭제
              }
            }}
          />
          <span className="text-sm cursor-pointer">로그인 저장 정보</span>
        </label>
        <div className="mb-5 w-full h-[3.25rem] m-auto">
          <button
            type="submit"
            className="w-full h-[3.25rem] text-center text-xl rounded-full bg-btn-primary font-medium text-white"
          >
            로그인
          </button>
        </div>
      </form>

      <div className="mb-5 w-full h-[3.25rem] m-auto">
        <button
          type="button"
          className="w-full h-[3.25rem] text-center text-xl rounded-full bg-yellow1 font-medium flex items-center gap-16"
        >
          {/* 이미지가 장식 목적이고 옆의 텍스트가 이미 충분한 의미를 전달하고 있기 때문에 alt = "" 지정*/}
          <img className="w-8 h-8 ml-6" src="/images/login/kakaoLogo.png" alt="" />
          <span>카카오 로그인</span>
        </button>
      </div>

      <div className="mb-5 w-full h-[3.25rem] m-auto">
        <Link
          to="/users/signup"
          className="block w-full h-full text-center text-xl rounded-full border-btn-primary border text-btn-primary font-medium leading-[3.25rem] "
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
