import { Injectable } from "@nestjs/common";

export interface Products {
    id:number
    name: string
    description: string
    price: number
    stock: boolean
    imgUrl: string
}

@Injectable()
export class ProductsRepository {
    private products: Products[] = [
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
        }
    ]

    async getProducts() {
        return this.products;
    }
}