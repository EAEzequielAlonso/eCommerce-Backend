import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/Modules/Users/User.repository";
import { User } from "../Users/User.entity";

@Injectable () 
export class AuthService {
    constructor (private readonly userRepository: UsersRepository) {}

    async userLogin(email: string, password: string): Promise<User | string> {
        return await this.userRepository.userLogin(email, password);
    }
}