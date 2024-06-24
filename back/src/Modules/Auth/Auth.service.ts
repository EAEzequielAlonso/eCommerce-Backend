import { Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { LoginUserDto } from "./Dtos/LoginUser.dto";
import { AuthRepository } from "./Auth.repository";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";

@Injectable () 
export class AuthService {

    constructor (private readonly authRepository: AuthRepository) {}

    async signin(userLogin: LoginUserDto): Promise<Omit<User, "password"> & {token: string}> {
        return await this.authRepository.signin(userLogin);
    }

    userSignup(user: CreateUserDto & { passwordConfirm: string; }): Promise<Omit<User, "password">> {
        return this.authRepository.userSignup(user);
    }
}