import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Category } from "../Categories/Category.entity";
import { OrderDetail } from "../OrderDetails/OrderDetail.entity";

@Entity({name: "products"})
export class Product {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string

    @Column({length:50, nullable:false})
    desription: string

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number

    @Column({nullable:false})
    stock: number

    @Column()
    imgUrl: string

    @Column()
    category_id: string

    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToMany(() => OrderDetail)
    @JoinTable()
    orderDetails: OrderDetail[]

}