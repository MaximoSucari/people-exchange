import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTokenService } from './wallet-token.service';
import { WalletToken } from './wallet-token';
import { WalletTokenController } from './wallet-token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletToken]),
    forwardRef(() => WalletTokenModule),
  ],
  providers: [WalletTokenService],
  controllers: [WalletTokenController],
  exports: [WalletTokenService],
})
export class WalletTokenModule {}
