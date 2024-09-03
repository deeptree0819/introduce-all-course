import "./globals.css";

import ToastContainer from "@components/container/ToastContainer";
import Modal from "@components/modal/Modal";
import ReactQueryProvider from "@components/provider/ReactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";

const Pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 로봇다이브",
    default: "로봇다이브",
  },
  description: "모두를 위한 로봇 교육, AI 교육 플랫폼",
  openGraph: {
    title: {
      template: "%s | 로봇다이브",
      default: "로봇다이브",
    },
    description: "모두를 위한 로봇 교육, AI 교육 플랫폼",
    images: "/images/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en" className={Pretendard.className}>
        <body>
          {children}
          <ToastContainer />
          <Modal />
          <div id="overlay-root" />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
