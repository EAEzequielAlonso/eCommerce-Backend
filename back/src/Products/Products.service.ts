import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./Products.respository";
import { ProductDto } from "./Products.dto";
import { Product } from "./Products.interface";

@Injectable ()
export class ProductsService {

    constructor (private productsReposytory: ProductsRepository){}

    getProducts(page:number, limit:number) {
        return this.productsReposytory.getProducts(page, limit);
    }

    getProductById(id: number) {
        return this.productsReposytory.getProductById(id);
    }

    createProduct(productDto: ProductDto) {
        return this.productsReposytory.createProduct(productDto);
    }

    updateProduct(id: number, product: Product) {
        return this.productsReposytory.updateProduct(id, product);
    }

    deleteProduct(id: number) {
        return this.productsReposytory.deleteProduct(id);
    }
    
}