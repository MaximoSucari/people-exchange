import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token';
import { TokenService } from './token.service';
import { TokensController } from './token.controller';
import { WalletTokenModule } from '../wallet-token/wallet-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => WalletTokenModule),
  ],
  providers: [TokenService],
  controllers: [TokensController],
  exports: [TokenService],
})
export class TokenModule {}
