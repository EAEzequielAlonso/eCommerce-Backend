import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "../../Products/Entities/Product.entity";
import { Type } from "class-transformer";
import {v4 as uuid} from "uuid";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID('4', { message: 'userID must be a valid UUID version 4' })
    userId: string

    @IsArray()
    @ArrayNotEmpty({ message: 'Products array must contain at least one product.' })
    products: uuid[];
}