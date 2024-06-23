import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Product } from "../Products/Entities/Product.entity";

@Entity({name: "orderdetails"})
export class OrderDetail {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

} 