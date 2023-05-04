import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Token } from '../token/token';
import { Wallet } from '../wallet/wallet';

export class CreateWalletTokenDto {
  @IsNotEmpty()
  wallet: Wallet;

  @IsNotEmpty()
  token: Token;

  @IsInt()
  @IsPositive()
  amount: number;
}
