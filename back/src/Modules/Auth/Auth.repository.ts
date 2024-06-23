import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./Dtos/LoginUser.dto";
import { User } from "../Users/Entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class AuthRepository { 
    
    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

    async userLogin (userLogin: LoginUserDto): Promise<User | string> {
        const user:User = await this.userRepository.findOne({where: {email : userLogin.email}, relations: {orders:true}});
        if (user) {
            if (user.password === userLogin.password)
                return user;
        }
        return "Email o password incorrectos";
    }
}