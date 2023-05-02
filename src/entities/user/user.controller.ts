import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return newUser;
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
