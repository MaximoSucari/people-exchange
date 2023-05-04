import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletTokenDto } from './create-wallet-token.dto';
import { WalletToken } from './wallet-token';

@Injectable()
export class WalletTokenService {
  constructor(
    @InjectRepository(WalletToken)
    private readonly walletTokenRepository: Repository<WalletToken>,
  ) {}

  async create(
    createWalletTokenDto: CreateWalletTokenDto,
  ): Promise<WalletToken> {
    const walletToken = new WalletToken();
    walletToken.amount = createWalletTokenDto.amount;
    walletToken.wallet = createWalletTokenDto.wallet;
    walletToken.token = createWalletTokenDto.token;

    return this.walletTokenRepository.save(walletToken);
  }

  async findAll(): Promise<WalletToken[]> {
    return this.walletTokenRepository.find();
  }

  async findOne(id: number): Promise<WalletToken> {
    return this.walletTokenRepository.findOne({ where: { id } });
  }

  async findByWalletId(walletId: string): Promise<any> {
    console.log('ta');
    const walletTokens = await this.walletTokenRepository.find({
      where: {
        wallet: {
          id: walletId,
        },
      },
    });
    console.log(walletTokens);

    return walletTokens;
  }

  async update(
    id: number,
    updateWalletTokenDto: CreateWalletTokenDto,
  ): Promise<WalletToken> {
    const walletToken = await this.walletTokenRepository.findOne({
      where: { id },
    });
    walletToken.amount = updateWalletTokenDto.amount;
    walletToken.wallet = updateWalletTokenDto.wallet;
    walletToken.token = updateWalletTokenDto.token;

    return this.walletTokenRepository.save(walletToken);
  }

  async remove(id: number): Promise<void> {
    await this.walletTokenRepository.delete(id);
  }
}
