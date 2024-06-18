import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./Products.respository";
import { ProductDto } from "./Products.dto";
import { Product } from "./Products.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Product as ProductEntity} from "./Product.entity";
import { Repository } from "typeorm";
import { Category } from "../Categories/Category.entity";

@Injectable ()
export class ProductsService {

    constructor (private productsReposytory: ProductsRepository,
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}

    async preloadProductsSeed() {
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
            const productoExist = await this.productRepository.existsBy({name: product.name});
            if (!productoExist) {   
                const category = await this.categoryRepository.findOneBy({name: product.category});
                if (category) {
                    const productCreate = this.productRepository.create({...product, category_id: category.id, category: category});
                    await this.productRepository.save(productCreate)
                }
            }
        }
        console.log("Productos cargados con exito");
    }
        

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