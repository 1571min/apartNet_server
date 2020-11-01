import { IsNotEmpty, Length, IsEmail } from "class-validator";
import User from "../database/entities/User";

/**
 * 사용자 생성 DTO
 */
export class RegisterUser {
  @IsNotEmpty()
  @Length(1, 100)
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  public password!: string;

  @IsNotEmpty()
  public fullName!: string;

  @IsNotEmpty()
  public address!: string;

  public toEntity(): User {
    const { email, password,fullName, address } = this;

    const user = new User();
    user.email = email;
    user.password = password;
    user.fullName = fullName;
    user.address = address;

    return user;
  }
}
