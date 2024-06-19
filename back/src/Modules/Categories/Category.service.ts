import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./Category.repository";

@Injectable ()
export class CategoryService {
    
    constructor(private readonly categoryRepository:CategoryRepository) {}

    async preloadCategoriesSeed(): Promise<void> {
        return await this.categoryRepository.preloadCategoriesSeed() 
    }

}