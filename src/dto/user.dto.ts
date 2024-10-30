import { IsNotEmpty } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  email: string;
  created: Date;
  accessToken?: string;
  refreshToken?: string;
}
