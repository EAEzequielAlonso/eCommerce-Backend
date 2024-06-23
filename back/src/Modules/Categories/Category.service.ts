import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./Category.repository";

@Injectable ()
export class CategoryService {
        
    constructor(private readonly categoryRepository:CategoryRepository) {}

    async getCategories() {
        return await this.categoryRepository.getCategories();
    }
    
    async preloadCategoriesSeed(): Promise<void> {
        return await this.categoryRepository.preloadCategoriesSeed() 
    }

}