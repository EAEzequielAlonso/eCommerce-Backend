import { Injectable } from "@nestjs/common";
import { ProductDto } from "./Products.dto";
import { Product } from "./Products.interface";

@Injectable()
export class ProductsRepository {

    private id:number=13;
    private products: Product[] = [
        {
            id: 1,
            name: "PcNote",
            description: "Notebook",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 2,
            name: "Celular",
            description: "Nokia 1100",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 3,
            name: "Auricular",
            description: "Audifono noganet",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 4,
            name: "PcNote",
            description: "Notebook",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 5,
            name: "Celular",
            description: "Nokia 1100",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 6,
            name: "Auricular",
            description: "Audifono noganet",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 7,
            name: "PcNote",
            description: "Notebook",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 8,
            name: "Celular",
            description: "Nokia 1100",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 9,
            name: "Auricular",
            description: "Audifono noganet",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 10,
            name: "PcNote",
            description: "Notebook",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 11,
            name: "Celular",
            description: "Nokia 1100",
            price: 100,
            stock: true,
            imgUrl: "string"
        },
        {
            id: 12,
            name: "Auricular",
            description: "Audifono noganet",
            price: 100,
            stock: true,
            imgUrl: "string"
        }
    ]

    async getProducts(page: number, limit:number) {
        const start = (page-1) * limit;
        const end = page * limit;
        const productPaginated = await this.products.slice(start, end)
        return productPaginated;
    }

    async getProductById(id: number) {
        return await this.products.find(product => product.id===id);
    }

    async createProduct(product: ProductDto):Promise<number> {
        const newProduct:Product = {id: this.id++, ...product}
        this.products.push(newProduct);
        return newProduct.id;
    }

    async updateProduct(id: number, product: Product) {
        const index:number = this.products.findIndex(product => product.id === id)
        this.products[index] = product; 
        return id;
    }

    async deleteProduct(id: number) {
        const productsAfterDelete:Product[] = this.products.filter(product => product.id !== id)
        this.products = productsAfterDelete;
        return id;
    }
}