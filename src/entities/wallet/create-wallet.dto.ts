import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../user/user';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  moneyAmount: number;

  user: User;

  userId: string;
}
