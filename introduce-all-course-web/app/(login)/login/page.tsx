import CharImage from "@assets/char.png";
import kakaologinimage from "@assets/kakao_login_large_wide.png";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex grow flex-col laptop:flex-row">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="pt-10 text-2xl font-semibold laptop:pt-0 laptop:text-2xl desktop:text-4xl">
          로그인
        </div>
        <div className="items-center break-keep pb-7 pt-2 text-start text-sm font-light text-gray-700 laptop:mb-0 laptop:pb-9 laptop:pt-5 laptop:text-sm desktop:pb-12 desktop:pt-7 desktop:text-base">
          <button className="mx-auto w-full min-w-0 max-w-[300px] items-center pt-3 delay-150 duration-300 desktop:max-w-[400px]">
            <Image src={kakaologinimage} alt="카카오로그인" />
          </button>
          <div
            className="destkop:pt-10 mx-auto w-full max-w-[300px] break-keep pt-5 text-center text-xs
              font-medium text-gray-400 laptop:pt-6 laptop:text-xs desktop:max-w-[400px] desktop:text-sm"
          >
            *카카오 로그인을 통해 회원가입 및 로그인을 할 수 있습니다.
            <br />
            로그인 버튼을 누르면, 귀하는{" "}
            <Link href="/privacy">
              <u>개인정보처리방침</u>
            </Link>{" "}
            및{" "}
            <Link href="/terms">
              <u>이용약관</u>
            </Link>
            에 동의하게 됩니다.
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center laptop:bg-[#E1F7FF]">
        <Image
          src={CharImage}
          alt="로봇다이브 캐릭터"
          className="max-w-[300px] delay-150 duration-300 laptop:max-w-[400px] desktop:max-w-[500px]"
        />
      </div>
    </div>
  );
};

export default LoginPage;
