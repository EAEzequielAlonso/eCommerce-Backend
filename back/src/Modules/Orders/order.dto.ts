export class OrderDto {
    userId: string
    products: ProductOrderDto[]
}

class ProductOrderDto {
    id: string
}