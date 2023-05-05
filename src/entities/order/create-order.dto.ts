import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Token } from '../token/token';
import { User } from '../user/user';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  token: Token;

  @IsNotEmpty()
  user: User;

  @IsEnum(['buy', 'sell'])
  type: 'buy' | 'sell';
}
