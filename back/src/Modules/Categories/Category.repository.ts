import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./Category.entity";
import { Repository } from "typeorm";
import preloadCategories from "../../Preload/categoryData.json"

@Injectable() 
export class CategoryRepository {
        
        constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

        async getCategories() {
            return await this.categoryRepository.find();
        }

        async getCategoryByName (name:string) {
            const categoryFinded: Category = await this.categoryRepository.findOne({
                where : {name}
            });
            if (categoryFinded) return categoryFinded;
            else throw new NotFoundException("Categoria inexistente");
        }

        async preloadCategoriesSeed(): Promise<string> {
            let cont:number = 0;
            for (const category of preloadCategories) {
                const categoryExist:Boolean = await this.categoryRepository.existsBy({name: category.name});
                if (!categoryExist) {
                    await this.categoryRepository.save(category)
                    cont++;
                }
            }
            let response:string;
            if (cont === 0 ) response = `No se Cargó ninguna categoria nueva`;
            else if (cont === 1 ) response = `Se Cargó 1 categoria nueva`;
            else if (cont > 1 ) response = `Se Cargaron ${cont} categrias nuevas`; 
            console.log(response)
            return response
        }
}