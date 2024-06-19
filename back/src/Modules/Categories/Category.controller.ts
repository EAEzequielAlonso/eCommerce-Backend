import { Controller, Post} from "@nestjs/common";
import { CategoryService } from "./Category.service";

@Controller ("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post("seeder")
    async preloadCategoriesSeed (): Promise<void> {
        return await this.categoryService.preloadCategoriesSeed();
    }
}