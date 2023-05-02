import { Injectable } from '@nestjs/common';
import { Token } from './token';
import { CreateTokenDto } from './create-token.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(user: User): Promise<Token> {
    try {
      const newToken = new Token();

      newToken.user = user;
      newToken.tokenName = user.tokenName;
      newToken.tokenQuantity =
        parseInt(process.env.DEFAULT_TOKEN_QUANTITY) || 100;

      const savedToken = await this.tokenRepository.create(newToken);
      return await this.tokenRepository.save(savedToken);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTokens(): Promise<Token[]> {
    return this.tokenRepository.find();
  }
}
