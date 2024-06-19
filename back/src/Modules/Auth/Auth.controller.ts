import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { User } from "../Users/User.entity";

@Controller ("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signin")
    async userLogin (@Body() email:string, password:string): Promise<User | string> {
        return await this.authService.userLogin(email, password);
    }

}