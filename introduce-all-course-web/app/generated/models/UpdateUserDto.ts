/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
  nickname?: string;
  profile_url?: string;
  gender?: UpdateUserDto.gender;
  email?: string;
  birthyear?: string;
};
export namespace UpdateUserDto {
  export enum gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
}
