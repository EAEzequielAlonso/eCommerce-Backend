import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./User.repository";

@Injectable ()
export class UsersService {
    constructor (private usersReposytory: UsersRepository){}
    getUsers() {
        return this.usersReposytory.getUsers();
    }
}