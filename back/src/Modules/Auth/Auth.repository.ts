import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./Dtos/LoginUser.dto";
import { User } from "../Users/Entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthRepository {
    
    constructor (@InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService) {}

    async signin (userLogin: LoginUserDto ): Promise<Omit<User, "password"> & {token: string}> {
        const userDB: User = await this.userRepository.findOneBy({email: userLogin.email})
        if (!userDB) {
            throw new BadRequestException ("Usuario o Clave incorrectos")
        }
        const isPasswordValid= await bcrypt.compare(userLogin.password, userDB.password)
        if (!isPasswordValid) {
            throw new BadRequestException ("Usuario o Clave incorrectos")
        }

        const userPayload = {
            sub: userDB.id, //se suscribe a este user WT
            id: userDB.id,
            email: userDB.email
        }
        const token = this.jwtService.sign(userPayload)

        return {...userDB, token: token}
    }

    async userSignup(user: CreateUserDto & { passwordConfirm: string; }): Promise<Omit<User, "password">> {
        const userDB = await this.userRepository.findOneBy({email: user.email})
        console.log(userDB)
        if (userDB) throw new BadRequestException("El usuario ya existe");
        if (user.password !== user.passwordConfirm) throw new BadRequestException("La contraseña y su confirmacion no cohinciden")
        const passwordHash= await await bcrypt.hash(user.password,10)

        return await this.userRepository.save({...userDB, password: passwordHash});
    } 
}