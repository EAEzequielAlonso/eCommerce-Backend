import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./Entities/User.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "./Dtos/CreateUser.dto";

@Injectable()
export class UsersRepository {

    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}


    async getUsers(page: number, limit:number): Promise<User[]> {
        return await this.userRepository.find(
            {select: ["id", "name", "email", "isAdmin", "phone", "address", "country", "city", "orders"],
             skip: (page-1)*limit,
             take: limit})
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({
            select: ["id", "name", "email", "phone", "address", "country", "city", "orders"],
            where : {id},
            relations: {orders: true}}); 
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where : {email}
        }); 
    }

    async createUser(user: Partial<CreateUserDto>):Promise<User> {
        return await this.userRepository.save(user);
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        let userUpdate: User = await this.userRepository.findOneBy({id})
        if (userUpdate){
            userUpdate = {...userUpdate, ...user};
            await this.userRepository.save(userUpdate);
            return id;
        } else {
            throw new NotFoundException("El usuario a actualizar no Existe")
        }
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete(id)
    }
}