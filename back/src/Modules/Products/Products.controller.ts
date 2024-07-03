import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { AuthGuard } from "../Auth/Guards/Auth.guard";
import { Product } from "./Entities/Product.entity";
import { CreateProductDto } from "./Dtos/CreateProduct.dto";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";
import { Roles } from "../Users/Roles/roles.decorator";
import { Role } from "../Users/Roles/roles.enum";
import { RolesGuard } from "../Users/Roles/roles.guard";
import { ErrorManager } from "../../Utils/ErrorManager";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller ("products")
export class ProductsController {
    constructor (private readonly productsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    async getProducts(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ): Promise<Product[]> {

        return ErrorManager ({
            functionTry: () => this.productsService.getProducts(page, limit), 
            message: "Error al intentar mostrar los productos"
        })
    }

    @Get(":id")
    @HttpCode(200)
    async getProductById(@Param("id", ParseUUIDPipe) id: string): Promise<Product> {

        return ErrorManager ({
            functionTry: () => this.productsService.getProductById(id), 
            message: "Error al intentar mostrar el producto"
        })
    }

    @ApiBearerAuth()
    @Post() 
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async createProduct(@Body() product: CreateProductDto): Promise<string> {

        return ErrorManager ({
            functionTry: () => this.productsService.createProduct(product), 
            message: "Error al intentar crear el producto"
        })
    }

    @Post("seeder")
    async preloadProductsSeed (): Promise<void> {

        return ErrorManager ({
            functionTry: () => this.productsService.preloadProductsSeed(), 
            message: "Error al intentar ejecutar la precarga de Productos"
        })        
    }

    @ApiBearerAuth()
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    async updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {

        return ErrorManager ({
            functionTry:() => this.productsService.updateProduct(id, product), 
            message :"Error al intentar actualizar el producto"
        })
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteProduct(@Param("id", ParseUUIDPipe) id: string): Promise<string> {

        return ErrorManager ({
            functionTry: () => this.productsService.deleteProduct(id),  
            message: "Error al intentar eliminar el Producto"
        })
    }
}