import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./User.repository";
import { User } from "./Entities/User.entity";
import { CreateUserDto } from "./Dtos/CreateUser.dto";

@Injectable ()
export class UsersService {
        
    constructor (private readonly usersReposytory: UsersRepository){}

    async getUsers(page:number, limit: number): Promise<User[]> {
        const users: User[] = await this.usersReposytory.getUsers(page, limit);
        if (users.length>0) return users;
        else throw new NotFoundException("No hay usuarios en la Base de Datos")
    }

    async getUserById(id:string): Promise<User> {
        const userFinded:User = await this.usersReposytory.getUserById(id);
        if (userFinded) return  userFinded;
        else throw new NotFoundException("El usuario buscado no Existe")
    }

    async createUser(user: CreateUserDto): Promise<string> {
        const newUser:User = await this.usersReposytory.createUser(user);
        if (newUser) return newUser.id;
        else throw new InternalServerErrorException("Error al intentar Crear y guardar el Usuario")
    }

    async deleteUser(id: string): Promise<string> {
        const userDelete = await this.usersReposytory.deleteUser(id);
        if (userDelete.affected===1)
            return id;
        else throw new NotFoundException("El usuario a eliminar no Existe")
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        return await this.usersReposytory.updateUser(id, user);
    }
}