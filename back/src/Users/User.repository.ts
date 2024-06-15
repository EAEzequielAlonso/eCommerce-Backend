import { Injectable } from "@nestjs/common";
import { User } from "./User.interface";
import { UserDto } from "./User.dto";

@Injectable()
export class UsersRepository {

    private id:number = 9;
    private users: User[] = [
        {
            id: 1,
            name: "Ezequiel Alonso",
            email: "eze@gmail.com",
            password: "ezealon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 2,
            name: "Nadia Correia",
            email: "nadia@gmail.com",
            password: "nadcor.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 3,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 4,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 5,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 6,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 7,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 8,
            name: "Ailin Alonso",
            email: "ailin@gmail.com",
            password: "ailinalon.0",
            address: "Las Camelias 345",
            phone: "11-68443073",
            country: "Argentina",
            city: "Buenos Aires"
        }
    ]

    async getUsers(page: number, limit:number) {
        const start = (page-1) * limit;
        const end = page * limit;
        const userPaginated = await this.users.slice(start, end)
        return userPaginated;
    }

    async userLogin (email: string, password:string) {
        const user = await this.users.find(user => user.email === email);
        if (user) {
            if (user.password === password)
                return user;
        }
        return "Email o password incorrectos";
    }

    async getUserById(id: number) {
        const {name, email, address, phone,country, city} = await this.users.find(user => user.id===id);
        return {id, name, email, address, phone,country, city};
    }

    async createUser(user: UserDto):Promise<number> {
        const newUser:User = {id: this.id++, ...user}
        await this.users.push(newUser);
        return newUser.id;
    }

    async updateUser(id: number, user: User) {
        const index:number = this.users.findIndex(user => user.id === id)
        this.users[index] = user; 
        return id;
    }

    async deleteUser(id: number) {
        const usersAfterDelete:User[] = this.users.filter(user => user.id !== id)
        this.users = usersAfterDelete;
        return id;
    }
}