import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { Role } from "../Users/Roles/roles.enum";
import { userCredentialDto } from "./Dtos/UserCredential.dto";
import { UsersRepository } from "../Users/User.repository";


@Injectable()
export class AuthRepository {
    
    constructor (private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService) {}

    async signin (userLogin: userCredentialDto ): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {
        const userDB: User = await this.usersRepository.getUserByEmail(userLogin.email)
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

    async signup(user: CreateUserDto): Promise<Omit<User, "password">> {
        const userDB = await this.usersRepository.getUserByEmail(user.email)
        if (userDB) throw new BadRequestException("El usuario ya existe");
        if (user.password !== user.passwordConfirm) throw new BadRequestException("La contraseña y su confirmacion no cohinciden")
        const passwordHash= await await bcrypt.hash(user.password,10)
        const {passwordConfirm, ...resultSaveUser} = user
        const userSave = await this.usersRepository.createUser({...resultSaveUser, password: passwordHash});
        const {password, ...resultSendUser} = userSave;
        return resultSendUser;
    } 
}