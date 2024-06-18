import { Module } from "@nestjs/common";
import { CategoryController } from "./Category.controller";
import { CategoryService } from "./Category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./Category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController], 
})
export class CategoryModule {

}