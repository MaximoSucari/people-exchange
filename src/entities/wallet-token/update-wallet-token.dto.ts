import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateWalletTokenDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  }
  