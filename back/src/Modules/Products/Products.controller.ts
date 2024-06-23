import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { AuthGuard } from "src/Modules/Auth/Guards/Auth.guard";
import { Product } from "./Entities/Product.entity";
import { CreateProductDto } from "./Dtos/CreateProduct.dto";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";

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
    async getProductById(@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async createProduct(@Body() product: CreateProductDto): Promise<string> {
       
        try { return await this.productsService.createProduct(product);}
        catch (e) {throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR, 
            error: "Error al Intentar Crear el Usuario"
        }, HttpStatus.INTERNAL_SERVER_ERROR)}
    }

    @Post("seeder")
    async preloadProductsSeed (): Promise<void> {
        return await this.productsService.preloadProductsSeed();
        
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {
        return await this.productsService.updateProduct(id, product);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteProduct(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.productsService.deleteProduct(id);
    }
}