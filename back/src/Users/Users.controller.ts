import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { UserDto } from "./User.dto";
import { User } from "./User.interface";
import { AuthGuard } from "src/Auth/Auth.guard";

@Controller ("users")
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUsers(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ) {
        return await this.usersService.getUsers(page, limit);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    getUserById(@Param("id") id: string) {
        return this.usersService.getUserById(Number(id));
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() user:UserDto) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    updateUser(@Param("id") id: string, @Body() user:User) {
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    deleteUser(@Param("id") id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}