import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';
import { Order } from './Order.entity';

@Controller('orders') 
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get(":id")
    async getOrder (@Param("id") id:string): Promise<Order> {
        return await this.ordersService.getOrder(id);
    }
    
    @Post()
    async addOrder (@Body() order: OrderDto): Promise<Order | string> {
        return await this.ordersService.addOrder(order);
    } 
}
