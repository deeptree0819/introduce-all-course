/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
  kakao_id: number;
  nickname: string;
  profile_url: string;
  profile_thumbnail_url: string;
  gender: UpdateUserDto.gender;
  user_name: string;
  email: string;
  birthyear: string;
  phone_number: string;
};
export namespace UpdateUserDto {
  export enum gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
}
