import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletTokenService } from './wallet-token.service';
import { CreateWalletTokenDto } from './create-wallet-token.dto';
import { WalletToken } from './wallet-token';

@Controller('wallet-tokens')
export class WalletTokenController {
  constructor(private readonly walletTokenService: WalletTokenService) {}

  @Post()
  create(
    @Body() createWalletTokenDto: CreateWalletTokenDto,
  ): Promise<WalletToken> {
    return this.walletTokenService.create(createWalletTokenDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<WalletToken> {
    return this.walletTokenService.findOne(+id);
  }

  @Get(':walletId')
  findByWalletId(@Param(':walletId') walletId: string): Promise<WalletToken[]> {
    return this.walletTokenService.findByWalletId(walletId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletTokenDto: CreateWalletTokenDto,
  ): Promise<WalletToken> {
    return this.walletTokenService.update(+id, updateWalletTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletTokenService.remove(+id);
  }
}
