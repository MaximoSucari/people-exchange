import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { Order } from './order';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('/id/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Get('user/:userId')
  getOrderByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post('/:orderId')
  confirmOrderById(@Param('orderId') orderId: string, userId: string): Promise<Order[]> {
    return this.orderService.confirmOrderById(orderId, userId);
  }

  @Get('buy')
  getBuyOrders(): Promise<Order[]> {
    return this.orderService.getAllBuyOrders();
  }

  @Get('sell')
  getSellOrders(): Promise<Order[]> {
    return this.orderService.getAllSellOrders();
  }

  @Get('token/:tokenId')
  getOrdersByTokenId(@Param('tokenId') tokenId: string): Promise<Order[]> {
    return this.orderService.getAllOrdersByTokenId(tokenId);
  }

  @Get('token/buy')
  getBuyOrdersByTokenId(): Promise<Order[]> {
    return this.orderService.getAllSellOrders();
  }
  @Get('token/sell')
  getSellOrdersByTokenId(): Promise<Order[]> {
    return this.orderService.getAllSellOrders();
  }
}
