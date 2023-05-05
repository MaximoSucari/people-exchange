import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './create-wallet.dto';
import { WalletToken } from '../wallet-token/wallet-token';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletService.create(createWalletDto);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Get(':walletId/tokens')
  async getWalletTokens(@Param('walletId') walletId: string): Promise<WalletToken[]> {
    return this.walletService.getTokensByWalletId(walletId);
  }
  
}
