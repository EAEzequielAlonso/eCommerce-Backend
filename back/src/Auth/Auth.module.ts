import { Module} from "@nestjs/common"; 
import { AuthService } from "./Auth.service";
import { AuthController } from "./Auth.controller";
import { UsersRepository } from "src/Users/User.repository";

@Module ({
    providers: [AuthService, UsersRepository],
    controllers: [AuthController]
})
export class AuthModule{

}