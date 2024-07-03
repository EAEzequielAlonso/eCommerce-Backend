/*import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import { UsersService } from '../Users.service';
import { UsersRepository } from '../User.repository';
import { User } from '../Entities/User.entity';
import { Order } from '../../Orders/Entities/Order.entity';
import {v4 as uuid} from "uuid"

describe ("userService", () => {

    let userService : UsersService;
    let mockUserRepository : Partial<UsersRepository>
    let idUsuarioCreado: uuid
    const mockUser: Omit<User, "id" | "orders"> = {
        name: "Ezequiel",
        password: "123456",
        email: "eze@gmail.com",
        phone: 1168776655,
        address: "33 756",
        isAdmin: false,
        city: ",",
        country:"",
    };

    beforeEach (async () => {
        mockUserRepository = {
            getUserById: () => Promise.resolve(undefined),
            createUser: (user: Omit<User, "id">): Promise<string> => 
              Promise.resolve(""),
            deleteUser: ()=> Promise.resolve(undefined)
        };

        const mockJwtService = {
            sign: (payload) => jwt.sign (payload, "testSecret")
        }
        const module = await Test.createTestingModule({
            providers: [UsersService, 
                { provide: JwtService, useValue: mockJwtService}, 
                { provide: UsersRepository, useValue: mockUserRepository}
            ],
        }).compile();
    
        userService = module.get<UsersService>(UsersService);
    })

    it ("Create an instance of AuthService", async ()=> {
        expect (userService).toBeDefined();
    });

    it ("Crea correctamente un usuario", async ()=> {
        const responseCreate = await userService.createUser(mockUser)
        // regex para UUID
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect (responseCreate).toBeDefined();
        expect (responseCreate).toEqual(regex); // debe responder un UUID valido
        idUsuarioCreado= responseCreate;

    });

    it ("Debe eliminar correctamente el usuario creado anteriormente", async ()=> {

        const responseDelete = await userService.deleteUser(idUsuarioCreado);
        
        // regex para UUID
        const regex = /^[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}$/i;
        console.log("responseDelete  " , responseDelete);
        expect (responseDelete).toBeDefined();
        expect (regex.test(responseDelete)).toBe(true);
    });

    it ("Debe retornar 'El usuario a eliminar no Existe' al tratar de eliminar un usuario inexistete", async ()=> {

        try {
            const responseDelete = await userService.deleteUser("usuarioIexistente");
        } catch (e) {
            expect (e.message).toBe("El usuario a eliminar no Existe");
        }
    });
/*
    it ("signUp() si es usuario ya fue creado debe tirar un error" , async () => {
        mockUsersService.getUserById = (id:string) =>
            Promise.resolve(mockUser as User) 
        try {
            await authService.signup(mockUser as User)
        } catch (e) {
            expect(e.message).toEqual("Email already in use")
        }
    })

    it ("signIn () retorna un error if the password is invalid", async () => {
        mockUserService.getUserByEmail = (email:string) => Promise.resolve(mockUser as User)
        try {
            await authService.signin(mockUser.email, "Invalid Password")
        } catch (e) {
            expect(e.message).toEqual("Invalid Password")
        }
    })

    it ("signIn () retorna un error if the pjasdiasn", async () => {
        try {
            await authService.signin(mockUser.email, mockUser.password)
        } catch (e) {
            expect(e.message).toEqual("User Not Found")
        }
    })

    it ("signin() teste que depende del JwtService", async () => {
        const mockUserVariant= {
            ...mockUser,
            password: await bcrypt.hash(mockUser.password, 10),
        }
        mockUserService.getUserByEmail= (email:string) => Promise.resolve(mockUserVariant as User)
        const response = await authService.signin(
            mockUser.email,
            mockUser.password,
        );

        expect (response).toBeDefined();
        expect (response.success).toBeDefined()
        expect (response.success). toEqual ("User logger in successfully");
    })
 })*/
