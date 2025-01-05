import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

UserForm.propTypes = {
  // 수정기능 구현시 기존의 계정 정보를 입력받아올 props - userInfo
  // 회원가입 시에도 쓰이기에 userInfo는 isRequired가 아님
  userInfo: PropTypes.shape(),
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function UserForm({ userInfo, buttonText, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError, // register로 설정한 기본 유효성 검사 외에 추가적인 에러 처리가 필요할 때 사용(수동으로 에러 설정) => 서버에서 받은 에러 표시
    clearErrors, // 특정 필드나 모든 필드의 에러 상태를 제거
  } = useForm({
    defaultValues: {
      // input의 defaultValue 속성 대신 useForm의 defaultValues 옵션으로 초기값 설정
      // 예시) <input defaultValue={userInfo?.phone || ""} {...register("phone")} />
      name: userInfo?.extra.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    },
  });

  // 코드 가독성을 위해 유효성 검사 규칙을 분리하여 관리
  const validationSchema = {
    // 회원가입 전용 필드
    email: {
      required: "이메일은 필수입니다.",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "이메일 형식이 올바르지 않습니다.",
      },
      // input 필드에서 포커스가 빠져나갈때(이메일 중복 체크)
      onBlur: async (e) => {
        console.log("onBlur 실행됨");
        const email = e.target.value;
        console.log("입력된 이메일:", email);

        // 이메일 형식이 올바른 경우에만 중복 체크(email 값이 존재 + 정규식 검사를 수행, 두 조건을 모두 확인)
        if (email && /\S+@\S+\.\S+/.test(email)) {
          try {
            console.log("axios 요청 직전");
            const { data } = await axios.get("https://11.fesp.shop/users/email", {
              params: { email },
              headers: {
                "client-id": "final04",
                "Content-Type": "application/json",
                accept: "application/json",
              },
            });

            console.log("서버 응답:", data);

            // ok 0이면 중복 이메일
            if (data.ok === 0) {
              // 수동으로 오류 메시지를 설정, type: "manual"은 개발자가 수동으로 설정한 오류 유형를 가리킴
              setError(
                "email",
                {
                  type: "manual",
                  message: "이미 등록된 이메일입니다.",
                }, // 오류가 발생한 필드로 포커스 자동으로 이동
                { shouldFocus: true }
              );
              return; // 중복 이메일인 경우, 이후 로직 실행을 중단
            } else {
              // ok 1이면 사용 가능(사용 가능한 이메일)
              // 이전에 설정된 email 필드의 모든 에러 상태를 제거함 =>  setError로 설정된 에러를 초기화하여, 유효한 이메일 입력 시 오류 메시지를 숨김
              clearErrors("email");
            }
          } catch (error) {
            console.error("에러 상세:", {
              message: error.message,
              status: error.response?.status,
              data: error.response?.data,
            });
          }
        }
      },
    },
    password: {
      required: "비밀번호는 필수입니다.",
      minLength: { value: 8, message: "8자 이상 입력해주세요." },
    },
    confirmPassword: {
      required: "비밀번호를 확인해주세요.",
      // 기본 제공 되는 required,pattern 등으로는 처리할 수 없는 복잡한 유효성 검사를 할 때 사용(사용자 정의 유효성 검사 기능)
      validate: {
        matchPassword: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
      },
    },
    userName: {
      required: "이름은 필수입니다.",
      pattern: {
        value: /^[A-Za-z가-힣]+$/,
        message: "한글 또는 영문만 입력 가능합니다",
      },
    },
    memberType: { required: "회원 유형을 선택해주세요." },
    gender: { required: "성별을 선택해주세요." },
    birth: { required: "생년원일을 선택해주세요." },

    // 공통 필드(회원가입 및 프로필 수정 시 공통으로 사용)
    name: {
      required: "닉네임은 필수입니다.",
    },
    phone: {
      required: "전화번호는 필수입니다.",
      pattern: {
        value: /^[0-9]+$/,
        message: "숫자만 입력 가능합니다.",
      },
      minLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
      maxLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
    },
    address: {
      required: "주소는 필수입니다.",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      {!userInfo && (
        <>
          {/* 이메일 */}
          <div className="mb-2.5 text-sm">
            <label className="block mb-2.5 font-semibold" htmlFor="email">
              이메일
            </label>
            <input
              className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", validationSchema.email)}
            />
            {errors.email && <p className="text-red1 text-xs mt-1 ps-1">{errors.email.message}</p>}
          </div>
          {/* 비밀번호 */}
          <div className="mb-2.5 text-sm">
            <label className="block mb-2.5 font-semibold" htmlFor="password">
              비밀번호
            </label>
            <input
              className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", validationSchema.password)}
            />
            {errors.password && <p className="text-red1 text-xs mt-1 ps-1">{errors.password.message}</p>}
          </div>
          {/* 비밀번호 확인 */}
          <div className="mb-2.5 text-sm">
            <label className="block mb-2.5 font-semibold" htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해주세요"
              {...register("confirmPassword", validationSchema.confirmPassword)}
            />
            {errors.confirmPassword && <p className="text-red1 text-xs mt-1 ps-1">{errors.confirmPassword.message}</p>}
          </div>
          {/* 이름 */}
          <div className="mb-2.5 text-sm">
            <label className="block mb-2.5 font-semibold" htmlFor="userName">
              이름
            </label>
            <input
              className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
              type="text"
              id="userName"
              placeholder="이름을 입력해주세요"
              {...register("userName", validationSchema.userName)}
            />
            {errors.userName && <p className="text-red1 text-xs mt-1 ps-1">{errors.userName.message}</p>}
          </div>
        </>
      )}
      {/* 닉네임 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="name">
          닉네임
        </label>
        <input
          className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
          type="text"
          id="name"
          placeholder="닉네임을 입력해주세요"
          // userName을 name으로 변경해야 함 => useForm의 defaultValues로 들어가 필요 없음(수정 완료)
          // defaultValue={userInfo ? userInfo.extra.userName : ""}
          {...register("name", validationSchema.name)}
        />
        {errors.name && <p className="text-red1 text-xs mt-1 ps-1">{errors.name.message}</p>}
      </div>
      {/* 휴대폰 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="phone">
          휴대폰
        </label>
        <input
          className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 mb-2.5 outline-none focus:border-btn-primary"
          type="tel"
          // pattern="[0-9]*"
          inputMode="numeric" // 모바일에서 숫자 키패드가 나타나도록 설정
          id="phone"
          placeholder="숫자만 입력해주세요"
          // defaultValue={userInfo ? userInfo.phone : ""}
          {...register("phone", validationSchema.phone)}
        />
        {errors.phone && <p className="text-red1 text-xs -mt-1.5 ps-1">{errors.phone.message}</p>}
      </div>
      {!userInfo && (
        <>
          {/* 회원 유형 */}
          <div className="flex flex-wrap items-center gap-5 text-sm mb-5">
            <p className="font-semibold">회원 유형</p>
            <div className="flex items-center gap-1">
              <input
                className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer"
                type="radio"
                id="memberType-user"
                value="user"
                {...register("memberType", validationSchema.memberType)}
              />
              <label className="cursor-pointer" htmlFor="memberType-user">
                구매회원
              </label>
              <input
                className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer ml-2.5"
                type="radio"
                id="memberType-seller"
                value="seller"
                checked
                {...register("memberType", validationSchema.memberType)}
              />
              <label className="cursor-pointer" htmlFor="memberType-seller">
                판매회원
              </label>
            </div>
            {errors.memberType && (
              <div className="w-full">
                <p className=" text-red1 text-xs ps-0.5 -mt-3">{errors.memberType.message}</p>
              </div>
            )}
          </div>
        </>
      )}
      {/* 주소 */}
      <div className="mb-5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="address">
          주소
        </label>
        <input
          className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 mb-0.5 outline-none focus:border-btn-primary"
          type="text"
          id="address"
          placeholder="주소를 입력해주세요"
          // defaultValue={userInfo ? userInfo.address : ""}
          {...register("address", validationSchema.address)}
        />
        {errors.address && <p className="text-red1 text-xs ps-1">{errors.address.message}</p>}
      </div>
      {!userInfo && (
        <>
          {/* 성별 */}
          <div className="flex flex-wrap items-center gap-5 text-sm mb-5">
            <p className="font-semibold">성별</p>
            <div className="flex items-center gap-1">
              <input
                className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer"
                type="radio"
                id="gender-male"
                value="male"
                {...register("gender", validationSchema.gender)}
              />
              <label className="cursor-pointer" htmlFor="gender-male">
                남자
              </label>
              <input
                className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-btn-primary cursor-pointer ml-2.5"
                type="radio"
                id="gender-female"
                value="female"
                {...register("gender", validationSchema.gender)}
              />
              <label className="cursor-pointer" htmlFor="gender-female">
                여자
              </label>
            </div>
            {errors.gender && (
              <div className="w-full">
                <p className=" text-red1 text-xs ps-0.5 -mt-3">{errors.gender.message}</p>
              </div>
            )}
          </div>
          {/* 생년월일 */}
          <div className="mb-6 text-sm">
            <label className="block mb-2.5 font-semibold" htmlFor="birth">
              생년월일
            </label>
            <input
              className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
              type="date"
              id="birth"
              {...register("birth", validationSchema.birth)}
            />
            {errors.birth && <p className="text-red1 text-xs mt-1 ps-1">{errors.birth.message}</p>}
          </div>
        </>
      )}
      {/* 가입하기 버튼 */}
      <button
        className="w-full h-[3.25rem] text-center text-xl rounded-full border border-btn-primary font-medium block m-auto mb-1 text-btn-primary"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
