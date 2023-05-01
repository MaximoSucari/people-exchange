import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user';
import { Token } from '../token/token';
import { Wallet } from '../wallet/wallet';
import { TokenModule } from '../token/token.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Wallet]), TokenModule, WalletModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UserModule {}
