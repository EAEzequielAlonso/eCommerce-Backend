import { Column, PrimaryGeneratedColumn, Entity, OneToOne, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { User } from "../Users/User.entity";
import { OrderDetail } from "../OrderDetails/OrderDetail.entity";

@Entity({name: "orders"})
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({type: Date})
    date: Date

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
    
    @OneToOne(() => OrderDetail)
    @JoinColumn()
    orderDetails: OrderDetail
} 