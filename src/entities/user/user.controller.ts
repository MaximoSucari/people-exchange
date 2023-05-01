import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../token/token';
import { TokenService } from '../token/token.service';
import { CreateWalletDto } from '../wallet/create-wallet.dto';
import { Wallet } from '../wallet/wallet';
import { WalletService } from '../wallet/wallet.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Token)
    private tokenService: TokenService,
    @InjectRepository(Wallet)
    private walletService: WalletService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      console.log(newUser, 'newUser');

      const wallet = new CreateWalletDto();
      wallet.moneyAmount = parseInt(process.env.DEFAULT_MONEY_AMOUNT) || 1000;
      wallet.name = 'Default wallet';
      wallet.user = newUser;
      const walletSaved = await this.walletService.create(wallet);
      console.log(walletSaved, 'walletSaved');

      const newToken = await this.tokenService.create(newUser);
      console.log(newToken, 'newToken');
      return;
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  /* @Post(':id/deposit')
  async depositMoney(
    @Param('id') id: string,
    @Body('amount') amount: number,
  ): Promise<Wallet> {
    return this.usersService.depositMoney(id, amount);
  } */
}
