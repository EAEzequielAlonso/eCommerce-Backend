import { Module} from "@nestjs/common"; 
import { ProductsService } from "./Products.service";
import { ProductsController } from "./Products.controller";
import { ProductsRepository } from "./Products.respository";

@Module ({
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController]
})
export class ProductsModule{

}