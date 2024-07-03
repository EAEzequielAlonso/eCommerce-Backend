import { Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { AuthRepository } from "./Auth.repository";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import { userCredentialDto } from "./Dtos/UserCredential.dto";

@Injectable () 
export class AuthService {

    constructor (private readonly authRepository: AuthRepository) {}

    async signin(userLogin: userCredentialDto): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {
        return await this.authRepository.signin(userLogin);
    }

    signup(user: CreateUserDto & { passwordConfirm: string; }): Promise<Omit<User, "password">> {
        return this.authRepository.signup(user);
    }
}