import { Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { LoginUserDto } from "./Dtos/LoginUser.dto";
import { AuthRepository } from "./Auth.repository";

@Injectable () 
export class AuthService { 
    constructor (private readonly authRepository: AuthRepository) {}

    async userLogin(userLogin: LoginUserDto): Promise<User | string> {
        return await this.authRepository.userLogin(userLogin);
    }
}