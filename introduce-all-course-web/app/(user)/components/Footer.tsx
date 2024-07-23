import Link from "next/link";

const Footer = () => {
  return (
    <footer className="row-span-2 grid w-full gap-y-10 px-5 py-12 laptop:row-span-1 laptop:grid-cols-3 laptop:px-32 laptop:py-16">
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
          >
            문의하기
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 laptop:order-first laptop:col-span-2">
        <div className="text-xs font-medium text-slate-500">
          (주) 딥트리 | 대표이사 이체은
        </div>
        <Link href="/terms" className="text-xs font-medium text-slate-500">
          이용약관
        </Link>
        <Link href="/privacy" className="text-xs font-medium text-slate-500">
          개인정보 처리방침
        </Link>
        <div className="text-xs font-medium text-slate-500">
          Copyright by (주) 딥트리. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
