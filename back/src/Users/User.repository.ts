import { Injectable } from "@nestjs/common";

export interface Users {
    id:number
    email: string
    name: string
    password: string
    address: string
    phone: string
    country?: string | undefined
    city?: string | undefined
}
@Injectable()
export class UsersRepository {
    private users: Users[] = [
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
        }
    ]

    async getUsers() {
        return this.users;
    }
}