import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { AuthGuard } from "src/Modules/Auth/Auth.guard";
import { Product } from "./Product.entity";

@Controller ("products")
export class ProductsController {
    constructor (private readonly productsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    async getProducts(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ): Promise<Product[]> {
        return await this.productsService.getProducts(page, limit);
    }

    @Get(":id")
    @HttpCode(200)
    async getProductById(@Param("id") id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async createProduct(@Body() product:Product): Promise<string> {
        return await this.productsService.createProduct(product);
    }

    @Post("seeder")
    async preloadProductsSeed (): Promise<void> {
        return await this.productsService.preloadProductsSeed();
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateProduct(@Param("id") id: string, @Body() product: Partial<Product>): Promise<string> {
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteProduct(@Param("id") id: string): Promise<string> {
        return await this.productsService.deleteProduct(id);
    }
}