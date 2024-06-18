import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./Category.entity";
import { Repository } from "typeorm";

@Injectable ()
export class CategoryService {
    
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async preloadCategoriesSeed() {
        const preloadDataCategories = [
            { name: 'smartphone' },
            { name: 'monitor' },
            { name: 'keyboard' },
            { name: 'mouse' },
          ];
        for (const category of preloadDataCategories) {
            const categoryExist = await this.categoryRepository.existsBy({name: category.name});
            console.log("resultado de categoryExist para ",category.name," es ",categoryExist);
            if (!categoryExist) {
                const categoryCreated = await this.categoryRepository.create(category)
                await this.categoryRepository.save(categoryCreated)
            }
        }
        console.log("Categorias cargadas co n exito");
    }

}