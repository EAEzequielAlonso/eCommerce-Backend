import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

const validateCredential= (request: Request) => {
    const auth = request.headers["authorization"];
    return !!auth;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateCredential(request);
    }
}