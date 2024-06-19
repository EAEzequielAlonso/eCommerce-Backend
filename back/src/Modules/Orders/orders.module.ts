import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { OrderRepository } from './orders.repository';
import { User } from '../Users/User.entity';
import { Product } from '../Products/Product.entity';
import { OrderDetail } from '../OrderDetails/OrderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository]
})
export class OrdersModule {}
