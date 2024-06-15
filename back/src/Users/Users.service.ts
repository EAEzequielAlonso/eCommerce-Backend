import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./User.repository";
import { UserDto } from "./User.dto";
import { User } from "./User.interface";

@Injectable ()
export class UsersService {
        
    constructor (private usersReposytory: UsersRepository){}

    async getUsers(page:number, limit: number) {
        return await this.usersReposytory.getUsers(page, limit);
    }

    getUserById(id:number) {
        return this.usersReposytory.getUserById(id);
    }

    createUser(user: UserDto) {
        return this.usersReposytory.createUser(user);
    }

    deleteUser(id: number) {
        return this.usersReposytory.deleteUser(id);
    }

    updateUser(id: number, user: User) {
        return this.usersReposytory.updateUser(id, user);
    }
}