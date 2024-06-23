import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

const validateRequest= (request: Request) => {
    const {name, email, password, address, phone} = request.body;
    if (name && email && password && address && phone)
        return true;
    else return false;
}

@Injectable()
export class UserCompleteGuard implements CanActivate {
    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log("Estamos en el Guardian UserCompleteGuard, el resultado es: ", validateRequest(request))
        return validateRequest(request);
    }
}