import { Injectable } from "@nestjs/common";
import { Order } from "./Order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../Products/Product.entity";
import { OrderDetail } from "../OrderDetails/OrderDetail.entity";
import { User } from "../Users/User.entity";
import { OrderDto } from "./order.dto";

@Injectable()  
export class OrderRepository {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail> 
    ) {}

    async addOrder(order: OrderDto) {
        const userFinded:User = await this.userRepository.findOneBy({id : order.userId})
        if (userFinded) {
            const OrderCreated:Order = await this.orderRepository.create({date: new Date(), user: userFinded}); 
            let productsList: Product[];
            let totalOrder: number = 0;
            for (let product of order.products) {
                const productFinded: Product = await this.productRepository.findOneBy({id:product.id})
                if (productFinded) {
                    if (productFinded.stock > 0) {
                        productsList.push(productFinded);
                        productFinded.stock = productFinded.stock-1;
                        totalOrder = totalOrder + productFinded.price;
                        await this.productRepository.save( productFinded );
                    }
                }
            }
            if (productsList.length>0) {
                const OrderDetailCreated = await this.orderDetailRepository.create({price:totalOrder, products:productsList})
                OrderCreated.orderDetails= OrderDetailCreated; 
                await this.orderRepository.save(OrderCreated);
                return {...OrderCreated, TotalPrice: totalOrder, orderDetailId:OrderDetailCreated.id}
            } else {
                return "Productos inexistentes o sin Stock"
            }
        } else {return "Usuario Inexistente"}
    }

    async getOrder(orderId: string) {
        const orderRequest = await this.orderRepository.findOneOrFail ({
            relations: {
                orderDetails:true
            },
            where: {
                id: orderId
            }
        })
        const orderDetailRequest = await this.orderDetailRepository.findOneOrFail ({
            relations: {
                products:true
            },
            where: {
                id: orderRequest.orderDetails.id
            }
        })
        return {order: orderDetailRequest, orderDetail: orderDetailRequest}
    }

}