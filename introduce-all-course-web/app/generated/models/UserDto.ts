/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from "./Role";
export type UserDto = {
  role: Role;
  users_id: number;
  created_at: string;
  updated_at: string;
  nickname: string;
  profile_url: string;
  profile_thumbnail_url: string;
  kakao_id: number;
  gender: UserDto.gender;
  user_name: string;
  email: string;
  birthyear: string;
  phone_number: string;
  deleted: boolean;
};
export namespace UserDto {
  export enum gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
}
