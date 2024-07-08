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
  title: "인트로듀스올코스 - 국비지원/부트캠프",
  description: "Developed by Dophin In Cali",
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
        </body>
      </html>
    </ReactQueryProvider>
  );
}
