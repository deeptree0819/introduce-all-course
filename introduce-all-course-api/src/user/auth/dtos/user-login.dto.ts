import { Tables } from "@common/database.types";
import { Gender } from "@common/enum";

export class UserLoginDto
  implements
    Pick<
      Tables<"users">,
      | "kakao_id"
      | "nickname"
      | "profile_url"
      | "profile_thumbnail_url"
      | "gender"
      | "user_name"
      | "email"
      | "birthyear"
      | "phone_number"
    >
{
  kakao_id: number;
  nickname: string;
  profile_url: string;
  profile_thumbnail_url: string;
  gender: Gender;
  user_name: string;
  email: string;
  birthyear: string;
  phone_number: string;
}
