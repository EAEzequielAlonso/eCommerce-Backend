import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorDto {
    functionTry: Function
    codeError?:number = HttpStatus.INTERNAL_SERVER_ERROR
    message?:string = "Internal Server Error"
    priority?:boolean = false
}

export const ErrorManager = async (errorEntry: ErrorDto ): Promise<any> => {
    try {
        return await errorEntry.functionTry();
    } catch (error) {
        console.log("estamos adentro del Error Manager")
        const { codeError, message, priority} = errorEntry
        throw new HttpException({
            status: priority ? codeError ?? error.status : error.status ?? codeError, 
            error: priority ? message ?? error.message : error.message ?? message,
        }, priority ? codeError ?? error.status : error.status ?? codeError)
    }
}