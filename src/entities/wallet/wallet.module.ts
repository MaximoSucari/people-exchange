import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletTokenModule } from '../wallet-token/wallet-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => WalletTokenModule),
  ],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
