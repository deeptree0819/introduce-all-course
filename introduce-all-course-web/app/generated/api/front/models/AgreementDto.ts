/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AgreementDto = {
  id: number;
  /**
   * 약관타입 (USE: 이용약관, PRIVACY: 개인정보처리방침, MARKETING: 마케팅 정보 수신동의, PRIVACY_COLLECTION_AND_USE: 개인정보 수집/이용 )
   */
  type: AgreementDto.type;
  /**
   * 약관 본문
   */
  content?: string;
  /**
   * 약관 링크
   */
  url?: string;
  /**
   * 필수약관여부
   */
  isRequired: boolean;
  /**
   * 현재버전여부
   */
  isCurrentVersion: boolean;
  /**
   * 약관버전
   */
  version: number;
  /**
   * 시행일시
   */
  enforcementDate: string;
};

export namespace AgreementDto {
  /**
   * 약관타입 (USE: 이용약관, PRIVACY: 개인정보처리방침, MARKETING: 마케팅 정보 수신동의, PRIVACY_COLLECTION_AND_USE: 개인정보 수집/이용 )
   */
  export enum type {
    USE = "USE",
    PRIVACY = "PRIVACY",
    MARKETING = "MARKETING",
  }
}
