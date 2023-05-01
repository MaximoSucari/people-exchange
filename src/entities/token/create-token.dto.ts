import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../user/user";

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  tokenName: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsNumber()
  tokenQuantity: number;
}
