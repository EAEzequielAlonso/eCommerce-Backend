import { Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { CategoryService } from "./Category.service";
import { ErrorManager } from "../../Utils/ErrorManager";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller ("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @HttpCode(200)
    async getCategories() {

        return ErrorManager ({
            functionTry:() => this.categoryService.getCategories(), 
            message: "Error al intentar mostrar las categorias"})
    }
    
    @Post("seeder")
    @HttpCode(201)
    async preloadCategoriesSeed (): Promise<string> {
        
        return ErrorManager ({
            functionTry: () => this.categoryService.preloadCategoriesSeed(), 
            message: "Error al intentar realizar la precarga de Categorias"})
    }
}