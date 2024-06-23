import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./User.repository";
import { User } from "./Entities/User.entity";
import { CreateUserDto } from "./Dtos/CreateUser.dto";

@Injectable ()
export class UsersService {
        
    constructor (private readonly usersReposytory: UsersRepository){}

    async getUsers(page:number, limit: number): Promise<User[]> {
        return await this.usersReposytory.getUsers(page, limit);
    }

    async getUserById(id:string): Promise<Omit<User, "password">> {
        return await this.usersReposytory.getUserById(id);
    }

    async createUser(user: CreateUserDto): Promise<string> {
        return await this.usersReposytory.createUser(user);
    }

    async deleteUser(id: string): Promise<string> {
        return await this.usersReposytory.deleteUser(id);
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        return await this.usersReposytory.updateUser(id, user);
    }
}