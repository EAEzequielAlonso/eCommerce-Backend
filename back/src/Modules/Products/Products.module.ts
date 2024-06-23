import { Module} from "@nestjs/common"; 
import { ProductsService } from "./Products.service";
import { ProductsController } from "./Products.controller";
import { ProductsRepository } from "./Products.respository";
import { Product } from "./Entities/Product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../Categories/Category.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController]
})
export class ProductsModule{

} 