import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/Users/User.repository";

@Injectable ()
export class AuthService {
    constructor (private readonly userRepository: UsersRepository) {}

    async userLogin(email: string, password: string) {
        return await this.userRepository.userLogin(email, password);
    }
}