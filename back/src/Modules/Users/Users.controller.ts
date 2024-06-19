import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { AuthGuard } from "src/Modules/Auth/Auth.guard";
import { User } from "./User.entity";

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
        return await this.usersService.getUsers(page, limit);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUserById(@Param("id") id: string): Promise<Omit<User, "password">> {
        return await this.usersService.getUserById(id);
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() user:User):Promise<string> {
        return await this.usersService.createUser(user);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateUser(@Param("id") id: string, @Body() user:Partial<User>): Promise<string> {
        return await this.usersService.updateUser(id, user);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteUser(@Param("id") id: string):Promise<string> {
        return await this.usersService.deleteUser(id);
    }
}