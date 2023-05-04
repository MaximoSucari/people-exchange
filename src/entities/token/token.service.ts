import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Token } from './token';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user';
import { WalletTokenService } from '../wallet-token/wallet-token.service';
import { CreateWalletTokenDto } from '../wallet-token/create-wallet-token.dto';
import { Wallet } from '../wallet/wallet';
import { WalletToken } from '../wallet-token/wallet-token';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @Inject(forwardRef(() => WalletTokenService))
    private walletTokenService: WalletTokenService,
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

  async initialMint(
    token: Token,
    userWallet: Wallet,
    amount: number,
  ): Promise<WalletToken> {
    try {
      const newWalletToken = new CreateWalletTokenDto();

      newWalletToken.token = token;
      newWalletToken.wallet = userWallet;
      newWalletToken.amount = amount;

      const savedWalletToken = await this.walletTokenService.create(
        newWalletToken,
      );

      return savedWalletToken;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTokens(): Promise<Token[]> {
    return this.tokenRepository.find();
  }
}
