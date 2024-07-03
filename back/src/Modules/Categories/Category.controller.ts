import { Controller, Get, HttpStatus, Post} from "@nestjs/common";
import { CategoryService } from "./Category.service";
import { ErrorManager } from "src/Utils/ErrorManager";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller ("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories() {

        return ErrorManager ({
            functionTry:() => this.categoryService.getCategories(), 
            message: "Error al intentar mostrar las categorias"})
    }
    
    @Post("seeder")
    async preloadCategoriesSeed (): Promise<void> {
        
        return ErrorManager ({
            functionTry: () => this.categoryService.preloadCategoriesSeed(), 
            message: "Error al intentar realizar la precarga de Categorias"})
    }
}