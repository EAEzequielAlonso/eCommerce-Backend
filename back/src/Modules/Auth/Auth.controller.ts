import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { User } from "../Users/Entities/User.entity";
import { LoginUserDto } from "./Dtos/LoginUser.dto";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";

@Controller ("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signin")
    async signin (@Body() userLogin:LoginUserDto): Promise<Omit<User, "password"> & {token: string}> {
        return await this.authService.signin(userLogin);
    }

    @Post("signup")
    async userRegister (@Body() user:CreateUserDto & {passwordConfirm: string}): Promise<Omit<User, "password">> {
        return await this.authService.userSignup(user);
    }
} 