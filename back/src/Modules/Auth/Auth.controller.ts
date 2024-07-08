import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { User } from "../Users/Entities/User.entity";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import { ErrorManager } from "src/Utils/ErrorManager";
import { ApiTags } from "@nestjs/swagger";
import { userCredentialDto } from "./Dtos/UserCredential.dto";

@ApiTags("Auth")
@Controller ("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signin")
    async signin (@Body() userLogin:userCredentialDto): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {

        return ErrorManager ({
            functionTry: () => this.authService.signin(userLogin), 
            message: "Error al intentar Loguear el Usuario"})
    }

    @Post("signup")
    async signup (@Body() user:CreateUserDto): Promise<Omit<User, "password">> {
        return ErrorManager ({
            functionTry: () => this.authService.signup(user), 
            message: "Error al intentar Registrar el Usuario"})
    }
} 