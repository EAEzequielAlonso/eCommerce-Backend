import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { User } from "../Users/Entities/User.entity";
import { LoginUserDto } from "./Dtos/LoginUser.dto";

@Controller ("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signin")
    async userLogin (@Body() userLogin:LoginUserDto): Promise<User | string> {
        return await this.authService.userLogin(userLogin);
    }

}