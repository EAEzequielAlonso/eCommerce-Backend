import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm"
import { Product } from "src/Modules/Products/Entities/Product.entity"; 
import {v4 as uuid} from "uuid"

@Entity({name:"files"})
export class File {
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @Column()
    name:string;

    @Column()
    mimeType: string;

    @Column({type:"bytea"})
    data:Buffer;

    @ManyToOne(() => Product, (product) => product.files)
    @JoinColumn()
    product: Product;
}
