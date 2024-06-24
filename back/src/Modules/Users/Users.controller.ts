import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { AuthGuard } from "src/Modules/Auth/Guards/Auth.guard";
import { User } from "./Entities/User.entity";
import { CreateUserDto } from "./Dtos/CreateUser.dto";
import { UpdateUserDto } from "./Dtos/UpdateUser.dto";
import { ErrorManager } from "src/Utils/ErrorManager";

@Controller ("users")
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUsers (
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ): Promise<User[]> {
        return ErrorManager (
                () => this.usersService.getUsers(page, limit),
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Error al mostrar los usuarios"
            ) 
        
        /*try { return await this.usersService.getUsers(page, limit);}
        catch (e) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR, 
                error: `Error al Intentar mostrar los Usuarios. Error: ${e.message}`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }*/
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUserById(@Param("id", ParseUUIDPipe) id: string): Promise<Omit<User, "password">> {
        
        return ErrorManager (
            () => this.usersService.getUserById(id),
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Error al mostrar el usuario"
        )/*
        try { return await this.usersService.getUserById(id);}
        catch (e) {throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR, 
            error: "Error al Intentar mostrar el Usuario"
        }, HttpStatus.INTERNAL_SERVER_ERROR)}*/
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() user:CreateUserDto):Promise<string> {
        try { return await this.usersService.createUser(user);}
        catch (e) {throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR, 
            error: "Error al Intentar Crear el Usuario"
        }, HttpStatus.INTERNAL_SERVER_ERROR)}
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user:UpdateUserDto): Promise<string> {
        try { return await this.usersService.updateUser(id, user);}
        catch (e) {throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR, 
            error: "Error al Intentar Actualizar el Usuario"
        }, HttpStatus.INTERNAL_SERVER_ERROR)}
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteUser(@Param("id", ParseUUIDPipe) id: string):Promise<string> {
        
        try { return await this.usersService.deleteUser(id);}
        catch (e) {throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR, 
            error: "Error al Intentar Eliminar el Usuario"
        }, HttpStatus.INTERNAL_SERVER_ERROR)}
    }
}