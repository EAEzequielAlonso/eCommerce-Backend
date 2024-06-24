import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';
import { AuthGuard } from '../Auth/Guards/Auth.guard';

@Controller('orders') 
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get()
    async getOrders (): Promise<Order[]> {
        return await this.ordersService.getOrders();
    }
    
    @Get(":id")
    @UseGuards(AuthGuard)
    async getOrderById (@Param("id", ParseUUIDPipe) id:string): Promise<Order> {
        return await this.ordersService.getOrderById(id);
    }
    
    @Post()
    @UseGuards(AuthGuard)
    async addOrder (@Body() order: CreateOrderDto): Promise<Order | string> {
        return await this.ordersService.addOrder(order);
    } 
}
