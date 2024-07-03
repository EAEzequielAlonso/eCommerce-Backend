import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { Role } from "../Users/Roles/roles.enum";
import { userCredentialDto } from "./Dtos/UserCredential.dto";


@Injectable()
export class AuthRepository {
    
    constructor (@InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService) {}

    async signin (userLogin: userCredentialDto ): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {
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
            email: userDB.email,
            //isAdmin: userDB.isAdmin,
            roles: [userDB.isAdmin ? Role.Admin : Role.User]
        }
        const token = this.jwtService.sign(userPayload)
        const {password,isAdmin,  ...result} = userDB
        return {...result, token: token}
    }

    async signup(user: CreateUserDto & { passwordConfirm: string; }): Promise<Omit<User, "password">> {
        const userDB = await this.userRepository.findOneBy({email: user.email})
        console.log(userDB)
        if (userDB) throw new BadRequestException("El usuario ya existe");
        if (user.password !== user.passwordConfirm) throw new BadRequestException("La contraseña y su confirmacion no cohinciden")
        const passwordHash= await await bcrypt.hash(user.password,10)
        const userSave = await this.userRepository.save({...user, password: passwordHash});
        const {password, ...result} = userSave;
        return result;
    } 
}