import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

/**
 * 관리자용 public 라우트 제어 훅.
 * 관리자 토큰이 존재할 경우 주어진 URL로 리다이렉트합니다.
 *
 * @param {string} [redirectUrl='/admin/users'] - 리다이렉트 대상 URL.
 */
export const useOnlyAdminPublicRoute = (redirectUrl = "/admin/users") => {
  const adminToken = getCookie("adminToken");
  // 'adminToken' 쿠키의 존재 여부 확인
  const hasCookie = !!adminToken;
  // 해당 쿠키가 있을 경우 리다이렉트
  if (hasCookie) {
    redirect(redirectUrl);
  }
};

/**
 * 관리자용 라우트 제어 훅.
 * 관리자 토큰이 존재하지 않을 경우 주어진 URL로 리다이렉트합니다.
 *
 * @param {string} [redirectUrl='/admin/login'] - 리다이렉트 대상 URL.
 */
export const useOnlyAdminRoute = (redirectUrl = "/admin/login") => {
  const adminToken = getCookie("adminToken");
  // 'adminToken' 쿠키의 존재 여부 확인
  const hasCookie = !!adminToken;
  // 해당 쿠키가 없을 경우 리다이렉트
  if (!hasCookie) {
    redirect(redirectUrl);
  }
};

/**
 * 일반 사용자용 public 라우트 제어 훅.
 * 사용자 토큰이 존재할 경우 주어진 URL로 리다이렉트합니다.
 *
 * @param {string} [redirectUrl='/home'] - 리다이렉트 대상 URL.
 */
export const useOnlyPublicRoute = (redirectUrl = "/home") => {
  const token = getCookie("token");
  // 'token' 쿠키의 존재 여부 확인
  const hasCookie = !!token;
  // 해당 쿠키가 있을 경우 리다이렉트
  if (hasCookie) {
    redirect(redirectUrl);
  }
};

/**
 * 인증된 사용자용 라우트 제어 훅.
 * 사용자 토큰이 존재하지 않을 경우 주어진 URL로 리다이렉트합니다.
 *
 * @param {string} [redirectUrl='/login'] - 리다이렉트 대상 URL.
 */
export const useOnlyUserRoute = (redirectUrl = "/login") => {
  const token = getCookie("token");
  // 'token' 쿠키의 존재 여부 확인
  const hasCookie = !!token;
  // 해당 쿠키가 없을 경우 리다이렉트
  if (!hasCookie) {
    redirect(redirectUrl);
  }
};
