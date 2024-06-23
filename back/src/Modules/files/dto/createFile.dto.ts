import { Product } from "src/Modules/Products/Entities/Product.entity";

export class CreateFileDto {
    name: string;
    mimeType: string;
    data: Buffer;
    product: Product
}
