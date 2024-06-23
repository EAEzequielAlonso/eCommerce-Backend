import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';

@Controller('orders') 
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get()
    async getOrders (): Promise<Order[]> {
        return await this.ordersService.getOrders();
    }
    
    @Get(":id")
    async getOrderById (@Param("id", ParseUUIDPipe) id:string): Promise<Order> {
        return await this.ordersService.getOrderById(id);
    }
    
    @Post()
    async addOrder (@Body() order: CreateOrderDto): Promise<Order | string> {
        return await this.ordersService.addOrder(order);
    } 
}
