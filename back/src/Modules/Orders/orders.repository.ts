import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "./Entities/Order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../Products/Entities/Product.entity";
import { OrderDetail } from "./Entities/OrderDetail.entity";
import { User } from "../Users/Entities/User.entity";
import { CreateOrderDto } from "./Dtos/CreateOrder.dto";

@Injectable()  
export class OrderRepository {
    
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail> 
    ) {}

    async getOrders(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: {
                orderDetails: {products: true}
        }});
    }

    async addOrder(order: CreateOrderDto): Promise<Order | string> {
        const userFinded:User = await this.userRepository.findOneBy({id : order.userId})
        if (userFinded) {
            const OrderCreated:Order = await this.orderRepository.create({date: new Date(), user: userFinded}); 
            let productsList: Product[] = [];
            let totalOrder: number = 0;
            for (let product of order.products) {
                const productFinded: Product = await this.productRepository.findOneBy({id:product.id})
                if (productFinded) {
                    if (productFinded.stock > 0) {
                        productsList.push(productFinded);
                        productFinded.stock = productFinded.stock-1;
                        totalOrder = totalOrder + Number(productFinded.price);
                        await this.productRepository.save( productFinded );
                    }
                } 
            }
            if (productsList) {
                const OrderDetailCreated:OrderDetail = await this.orderDetailRepository.create({price:totalOrder, products:productsList})
                await this.orderDetailRepository.save(OrderDetailCreated);
                console.log("ste es el orderDital de un producto con relacion: ", await this.productRepository.findOne({
                    where: {id: productsList[0].id}, 
                    relations: {orderDetails: true}
                }))
                OrderCreated.orderDetails= OrderDetailCreated; 
                await this.orderRepository.save(OrderCreated);
                const OrderReturn:Order = await this.orderRepository.findOne({
                    relations: {
                        orderDetails: true
                    },
                    where: {
                        id: OrderCreated.id
                    }
                })
                return OrderReturn;
            } else {
                throw new NotFoundException("Productos inexistentes o sin Stock");
            }
        } else {throw new NotFoundException("Usuario Inexistente")}
    }

    async getOrderById(orderId: string): Promise<Order> {
        const orderRequest:Order = await this.orderRepository.findOne ({
            relations: {
                orderDetails: {products: true}
            },
            where: {
                id: orderId
            }
        }) 
        return orderRequest;
    }

}