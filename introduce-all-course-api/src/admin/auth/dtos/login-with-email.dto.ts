import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginWithEmailDto {
  /*
   * 이메일
   *
   * @example admin@gmail.com
   */
  @IsEmail()
  @IsString()
  @ApiProperty({ example: "admin@gmail.com", description: "이메일" })
  email: string;

  /*
   * 비밀번호
   *
   * @example admin1234
   */
  @IsString()
  @ApiProperty({ example: "admin1234", description: "비밀번호" })
  password: string;
}
