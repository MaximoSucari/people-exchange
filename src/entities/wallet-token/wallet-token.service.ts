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

  async findOne(id: string): Promise<WalletToken> {
    return this.walletTokenRepository.findOne({ where: { id } });
  }

  async findByWalletId(walletId: string): Promise<any> {
    try {
      const walletTokens = await this.walletTokenRepository.find({
        where: {
          wallet: {
            id: walletId,
          },
        },
        relations: ['token'],
      });

      return walletTokens;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async update(
    id: string,
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
