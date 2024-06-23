import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./Entities/User.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./Dtos/CreateUser.dto";

@Injectable()
export class UsersRepository {

    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}


    async getUsers(page: number, limit:number): Promise<User[]> {
        const start:number = (page-1) * limit;
        const end:number  = page * limit;
        const users:User[] = await this.userRepository.find()
        if (users.length>0) return users.slice(start, end);
        else throw new NotFoundException("No hay usuarios en la Base de Datos")
    }

    async getUserById(id: string): Promise<Omit<User, "password">> {
        const userFinded:User = await this.userRepository.findOne({
            where : {id},
            relations: {orders: true}
        });
        if (userFinded) return  userFinded;
        else throw new NotFoundException("El usuario buscado no Existe")
    }

    async createUser(user: CreateUserDto):Promise<string> {
        const newUser:User = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser.id;
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

    async deleteUser(id: string): Promise<string> {
        const userDelete= await this.userRepository.delete(id)
        if (userDelete.affected===1)
            return id;
        else throw new NotFoundException("El usuario a eliminar no Existe")
    }
}