import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { OrderDto } from './order.dto';
import { Order } from './Order.entity';

@Injectable()
export class OrdersService {

    constructor (private readonly ordersRepository: OrderRepository) {}

    async getOrder(id: string): Promise<Order> {
        return await this.ordersRepository.getOrder(id);
    }    

    async addOrder(order: OrderDto): Promise<Order | string> {
        return await this.ordersRepository.addOrder(order);
    } 
}
