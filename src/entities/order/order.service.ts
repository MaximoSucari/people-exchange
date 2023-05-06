import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../token/token';
import { User } from '../user/user';
import { CreateOrderDto } from './create-order.dto';
import { Order } from './order';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.userId },
    });
    const token = await this.tokenRepository.findOne({
      where: { id: createOrderDto.tokenId },
    });

    order.user = user;
    order.token = token; // Aca seguro hay que hacer un GET al TokenRepository para traer el object completo
    order.price = createOrderDto.price;
    order.amount = createOrderDto.amount;
    order.type = createOrderDto.type;

    console.log(order);

    return this.orderRepository.save(order);
  }

  async getAllOrdersByTokenId(id: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { token: { id } } });
  }

  async getAllBuyOrdersByTokenId(id: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { token: { id }, type: 'buy' } });
  }

  async getAllSellOrdersByTokenId(id: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { token: { id }, type: 'sell' },
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getAllBuyOrders(): Promise<Order[]> {
    return this.orderRepository.find({ where: { type: 'buy' } });
  }

  async getAllSellOrders(): Promise<Order[]> {
    return this.orderRepository.find({ where: { type: 'sell' } });
  }

  async getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async getOrderByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }

  async updateOrder(
    id: string,
    updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.price = updateOrderDto.price || order.price;
    order.amount = updateOrderDto.amount || order.amount;
    order.type = updateOrderDto.type || order.type;

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
