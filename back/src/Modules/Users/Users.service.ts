import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./User.repository";
import { User } from "./User.entity";

@Injectable ()
export class UsersService {
        
    constructor (private readonly usersReposytory: UsersRepository){}

    async getUsers(page:number, limit: number): Promise<User[]> {
        return await this.usersReposytory.getUsers(page, limit);
    }

    async getUserById(id:string): Promise<Omit<User, "password">> {
        return await this.usersReposytory.getUserById(id);
    }

    async createUser(user: User): Promise<string> {
        return await this.usersReposytory.createUser(user);
    }

    async deleteUser(id: string): Promise<string> {
        return await this.usersReposytory.deleteUser(id);
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        return await this.usersReposytory.updateUser(id, user);
    }
}