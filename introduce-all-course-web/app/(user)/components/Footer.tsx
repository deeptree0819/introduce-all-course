import Link from "next/link";

const Footer = () => {
  return (
    <footer className="row-span-2 mx-auto grid w-full max-w-[1300px] gap-y-10 px-5 py-12 laptop:row-span-1 laptop:grid-cols-3 laptop:px-24 laptop:py-16">
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-y-3">
          <div className="text-sm font-semibold">서비스</div>
          <Link href="/event" className="text-xs font-medium text-slate-500">
            공고소개
          </Link>
          <Link href="/inquiry" className="text-xs font-medium text-slate-500">
            취업상담
          </Link>
          <Link
            href="/free-lecture"
            className="text-xs font-medium text-slate-500"
          >
            무료강의
          </Link>
        </div>
        <div className="col-span-2 flex flex-col gap-y-3">
          <div className="text-sm font-semibold">고객센터</div>
          <div className="text-xs font-medium text-slate-500">
            <span className="font-semibold">이메일</span> deeptree00@gmail.com
          </div>
          <Link
            href="https://tally.so"
            className="text-xs font-medium text-slate-500"
            target="_blank"
          >
            문의하기
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 laptop:order-first laptop:col-span-2">
        <div className="text-xs font-medium text-slate-500">
          딥트리 | 대표 이체은
        </div>
        <div className="text-xs font-medium text-slate-500 laptop:mt-12">
          <Link href="/terms">이용약관</Link>
          <span> | </span>
          <Link href="/privacy">개인정보 처리방침</Link>
        </div>
        <div className="text-xs font-medium text-slate-500">
          Copyright by (주) 딥트리. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
