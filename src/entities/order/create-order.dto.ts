import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsUUID()
  tokenId: string;

  @IsUUID()
  userId: string;

  @IsEnum(['buy', 'sell'])
  type: 'buy' | 'sell';
}
