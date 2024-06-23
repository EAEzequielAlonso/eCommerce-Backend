import { Module} from "@nestjs/common"; 
import { AuthService } from "./Auth.service";
import { AuthController } from "./Auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Users/Entities/User.entity";
import { AuthRepository } from "./Auth.repository";

@Module ({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, AuthRepository],
    controllers: [AuthController]
})
export class AuthModule{ 

}