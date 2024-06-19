import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {

    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}


    async getUsers(page: number, limit:number): Promise<User[]> {
        const start:number = (page-1) * limit;
        const end:number  = page * limit;
        const userPaginated:User[] = await this.userRepository.find()
        return userPaginated.slice(start, end);
    }

    async userLogin (email: string, password:string): Promise<User | string> {
        const user:User = await this.userRepository.findOne({where: {email}, relations: {orders:true}});
        if (user) {
            if (user.password === password)
                return user;
        }
        return "Email o password incorrectos";
    }

    async getUserById(id: string): Promise<Omit<User, "password">> {
        const userFinded:User = await this.userRepository.findOne({
            where : {id},
            relations: {orders: true}
        });
        return  userFinded;
    }

    async createUser(user: User):Promise<string> {
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
        }
    }

    async deleteUser(id: string): Promise<string> {
        const userDelete= await this.userRepository.delete(id)
        if (userDelete.affected===1)
            return id;
    }
}