import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./Entities/Product.entity";
import { Repository } from "typeorm";
import { Category } from "../Categories/Category.entity";
import { CreateProductDto } from "./Dtos/CreateProduct.dto";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";

@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Product) private productRepository:Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async preloadProductsSeed(): Promise<void> {
        const preloadproductCategories = [
            {
            name: "Iphone 15",
            description: "The best smartphone in the world",
            price: 199.99,
            stock: 12,
            category: "smartphone"
            },
            {
            name: "Samsung Galaxy S23",
            description: "The best smartphone in the world",
            price: 150,
            stock: 12,
            category: "smartphone"
            },
            {
            name: "Motorola Edge 40",
            description: "The best smartphone in the world",
            price: 179.89,
            stock: 12,
            category: "smartphone"
            },
            {
            name: "Samsung Odyssey G9",
            description: "The best monitor in the world",
            price: 299.99,
            stock: 12,
            category: "monitor"
            },
            {
            name: "LG UltraGear",
            description: "The best monitor in the world",
            price: 199.99,
            stock: 12,
            category: "monitor"
            },
            {
            name: "Acer Predator",
            description: "The best monitor in the world",
            price: 150,
            stock: 12,
            category: "monitor"
            },
            {
            name: "Razer BlackWidow V3",
            description: "The best keyboard in the world",
            price: 99.99,
            stock: 12,
            category: "keyboard"
            },
            {
            name: "Corsair K70",
            description: "The best keyboard in the world",
            price: 79.99,
            stock: 12,
            category: "keyboard"
            },
            {
            name: "Logitech G Pro",
            description: "The best keyboard in the world",
            price: 59.99,
            stock: 12,
            category: "keyboard"
            },
            {
            name: "Razer Viper",
            description: "The best mouse in the world",
            price: 49.99,
            stock: 12,
            category: "mouse"
            },
            {
            name: "Logitech G502 Pro",
            description: "The best mouse in the world",
            price: 39.99,
            stock: 12,
            category: "mouse"
            },
            {
            name: "SteelSeries Rival 3",
            description: "The best mouse in the world",
            price: 29.99,
            stock: 12,
            category: "mouse"
            }
            ];
        for (const product of preloadproductCategories) {
            const productoExist:boolean = await this.productRepository.existsBy({name: product.name});
            if (!productoExist) {   
                const category:Category = await this.categoryRepository.findOneBy({name: product.category});
                if (category) {
                    const productCreate:Product = this.productRepository.create({...product, category_id: category.id, category: category});
                    await this.productRepository.save(productCreate)
                }
            }
        }
        console.log("Productos cargados con exito");
    }

    async getProducts(page: number, limit:number): Promise<Product[]> {
        const start:number = (page-1) * limit;
        const end:number = page * limit;
        const productPaginated: Product[] = await this.productRepository.find()
        return productPaginated.slice(start, end);
    }

    async getProductById(id: string): Promise<Product> {
        const productFinded: Product = await this.productRepository.findOne({
            where : {id},
            relations: {category: true}
        });
        return productFinded;
    }
 
    async createProduct(product: CreateProductDto):Promise<string> {
        const category:Category = await this.categoryRepository.findOneBy({id : product.category_id})
        if (category) {
            const newProduct:Product = await this.productRepository.create(product);
            newProduct.category = category;
            await this.productRepository.save(newProduct);
            return newProduct.id;
        }else {
            throw new Error ("La categoria es inexistente")
        }
    }

    async updateProduct(id: string, product: UpdateProductDto): Promise<string> {
        let productUpdate: Product = await this.productRepository.findOneBy({id})
        if (productUpdate){
            if (productUpdate.category_id) {
                const category: Category = await this.categoryRepository.findOneBy({id: productUpdate.category_id})
                if (!category) return "No es posible actualizar, La categoria no existe"
                productUpdate.category = category;
            }
            productUpdate = {...productUpdate, ...product};
            await this.productRepository.save(productUpdate);
            return id;
        }
    }

    async deleteProduct(id: string): Promise<string> {
        const productDelete = await this.productRepository.delete(id)
        if (productDelete.affected===1)
            return id;
    }
}