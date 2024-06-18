import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {

    constructor (private readonly ordersRepository: OrderRepository) {}

    async getOrder(id: string) {
        return await this.ordersRepository.getOrder(id);
    }    

    async addOrder(order: OrderDto) {
        return await this.ordersRepository.addOrder(order);
    } 
}
