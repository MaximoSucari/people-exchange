import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user';
import { WalletToken } from '../wallet-token/wallet-token';
import { WalletTokenService } from '../wallet-token/wallet-token.service';
import { CreateWalletDto } from './create-wallet.dto';
import { Wallet } from './wallet';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => WalletTokenService))
    private walletTokenService: WalletTokenService,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.moneyAmount = createWalletDto.moneyAmount;
    const user = await this.userRepository.findOne({
      where: { id: createWalletDto.user.id },
    });

    wallet.user = createWalletDto.user;
    if (user) wallet.user = user;
    wallet.name = createWalletDto.name; // establecemos el userId en la billetera
    const newWallet = await this.walletRepository.create(wallet);
    return await this.walletRepository.save(newWallet);
  }

  async getTokensByWalletId(walletId: string): Promise<WalletToken[]> {
    try {
      return await this.walletTokenService.findByWalletId(walletId);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findOne(id: string): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { id } });
  }

  async update(id: string, updateWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id } });
    wallet.moneyAmount = updateWalletDto.moneyAmount;

    return this.walletRepository.save(wallet);
  }

  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}
