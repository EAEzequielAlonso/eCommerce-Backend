import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./Category.entity";
import { Repository } from "typeorm";

@Injectable() 
export class CategoryRepository {
        async getCategories() {
            return await this.categoryRepository.find();
        }

        constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

        async preloadCategoriesSeed(): Promise<void> {
            const preloadDataCategories = [
                { name: 'smartphone' },
                { name: 'monitor' },
                { name: 'keyboard' },
                { name: 'mouse' },
              ];
            for (const category of preloadDataCategories) {
                const categoryExist:Boolean = await this.categoryRepository.existsBy({name: category.name});
                if (!categoryExist) {
                    const categoryCreated:Category = await this.categoryRepository.create(category)
                    await this.categoryRepository.save(categoryCreated)
                }
            }
            console.log("Categorias cargadas co n exito");
        }
}