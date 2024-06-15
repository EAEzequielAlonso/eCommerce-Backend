import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { ProductDto } from "./Products.dto";
import { Product } from "./Products.interface";
import { AuthGuard } from "src/Auth/Auth.guard";

@Controller ("products")
export class ProductsController {
    constructor (private readonly productsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    async getProducts(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ) {
        return await this.productsService.getProducts(page, limit);
    }

    @Get(":id")
    @HttpCode(200)
    getProductById(@Param("id") id: string) {
        return this.productsService.getProductById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    createProduct(@Body() productDto:ProductDto) {
        return this.productsService.createProduct(productDto);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    updateProduct(@Param("id") id: string, @Body() product:Product) {
        return this.productsService.updateProduct(Number(id), product);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    deleteProduct(@Param("id") id: string) {
        return this.productsService.deleteProduct(Number(id));
    }
}