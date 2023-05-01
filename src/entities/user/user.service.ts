import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/transaction';
import { CreateWalletDto } from '../wallet/create-wallet.dto';
import { Wallet } from '../wallet/wallet';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private walletService: WalletService,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.name = createUserDto.name;
      user.lastName = createUserDto.lastName
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.tokenName = createUserDto.tokenName;

      // creamos una nueva billetera para el usuario
/*       const wallet = new CreateWalletDto();
      wallet.moneyAmount = parseInt(process.env.DEFAULT_MONEY_AMOUNT) || 1000;
      wallet.name = 'Default wallet' */

      // guardamos el usuario y la billetera
      const savedUser = await this.userRepository.save(user);
/*       wallet.user = savedUser;
      await this.walletService.create(wallet);

      console.log(wallet) */
      
      return savedUser;
    } catch (e) {
      console.debug(e);
    }
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  /* async depositMoney(id: string, amount: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { user_id: { id} },
      relations: ['transactions'],
    });
    const transaction = new Transaction();
    transaction.type = 'deposit';
    transaction.amount = amount;
    transaction.wallet = wallet;
    wallet.balance += amount;
    await this.walletRepository.save(wallet);
    await this.walletRepository.manager.save(transaction);
    return wallet;
  } */
}
