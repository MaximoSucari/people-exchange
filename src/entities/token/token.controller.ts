import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { User } from '../user/user';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() user: User) {
    console.log(user);
    return await this.tokenService.create(user);
  }

  @Post()
  async initialMint(@Body() user: User) {
    return await this.tokenService.create(user);
  }

  @Get()
  async getAllTokens() {
    const tokens = await this.tokenService.getAllTokens();
    return tokens;
  }
}
