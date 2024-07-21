import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';

@Injectable()
export class OrdersService {

    constructor (private readonly ordersRepository: OrderRepository) {}

    async getOrders(): Promise<Order[]> {
        return await this.ordersRepository.getOrders();
    }

    async getOrderById(id: string): Promise<Order> {
        return await this.ordersRepository.getOrderById(id);
    }    

    async addOrder(order: CreateOrderDto): Promise<Order | string> {
        return await this.ordersRepository.addOrder(order);
    } 
}
