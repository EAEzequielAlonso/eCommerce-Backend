import { Controller, Get, Post} from "@nestjs/common";
import { CategoryService } from "./Category.service";

@Controller ("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories() {
        return await this.categoryService.getCategories()
    }
    
    @Post("seeder")
    async preloadCategoriesSeed (): Promise<void> {
        return await this.categoryService.preloadCategoriesSeed();
    }
}