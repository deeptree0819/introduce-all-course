/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from "./Role";
export type AdminUpdateUserDto = {
  role?: Role;
  nickname?: string;
  profile_url?: string;
  profile_thumbnail_url?: string;
  gender?: AdminUpdateUserDto.gender;
  user_name?: string;
  email?: string;
  birthyear?: string;
  phone_number?: string;
};
export namespace AdminUpdateUserDto {
  export enum gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
}
