import { Tables } from "@common/database.types";
import { Gender } from "@common/enum";

export class UpdateUserDto
  implements
    Partial<
      Pick<
        Tables<"users">,
        "nickname" | "profile_url" | "gender" | "email" | "birthyear"
      >
    >
{
  nickname?: string;
  profile_url?: string;
  gender?: Gender;
  email?: string;
  birthyear?: string;
}
