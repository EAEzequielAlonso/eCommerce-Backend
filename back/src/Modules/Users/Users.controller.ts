import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { AuthGuard } from "../Auth/Guards/Auth.guard";
import { User } from "./Entities/User.entity";
import { UpdateUserDto } from "./Dtos/UpdateUser.dto";
import { ErrorManager } from "../../Utils/ErrorManager";
import { Role } from "./Roles/roles.enum";
import { RolesGuard } from "./Roles/roles.guard";
import { Roles } from "./Roles/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller ("users")
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    async getUsers (@Query("page") page:number = 1, @Query("limit") limit:number = 5,): Promise<User[]> {
        
        return ErrorManager ({
                functionTry:() => this.usersService.getUsers(page, limit), 
                message: "Error al mostrar los usuarios",
            }) 
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUserById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
        
        return ErrorManager ({
            functionTry: () => this.usersService.getUserById(id),
            message: "Error al mostrar el usuario"
        })
    }

    // @Post()
    // @HttpCode(201)
    // async createUser(@Body() user:CreateUserDto):Promise<string> {

    //     return ErrorManager ({
    //         functionTry:() => this.usersService.createUser(user), 
    //         message: "Error al Intentar Crear el Usuario"
    //     }) 
    // }

    @ApiBearerAuth()
    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user:UpdateUserDto): Promise<string> {

        return ErrorManager ({functionTry: () => this.usersService.updateUser(id, user), 
            message: "Error al Intentar Actualizar el Usuario"
        }) 
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteUser(@Param("id", ParseUUIDPipe) id: string):Promise<string> {
        
        return ErrorManager ({
            functionTry: () => this.usersService.deleteUser(id), 
            message: "Error al Intentar Eliminar el Usuario"
        }) 
    }

    @Post("seeder")
    @HttpCode(201)
    async preloadUsersSeed(): Promise<string> {
       
        return ErrorManager ({
            functionTry: () => this.usersService.preloadUsersSeed(), 
            message: "Error al Intentar hacer la precarga de usuarios"
        })
    }
}