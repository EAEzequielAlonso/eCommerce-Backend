import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./Products.respository";

@Injectable ()
export class ProductsService {
    constructor (private productsReposytory: ProductsRepository){}
    getProducts() {
        return this.productsReposytory.getProducts();
    }
}