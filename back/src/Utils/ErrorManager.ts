import { HttpException } from "@nestjs/common";

export const ErrorManager = async (functionTry:Function, codeError:number, message:string, ): Promise<any> => {
    try {
        return await functionTry();
    } catch (error) {
        throw new HttpException({
            status: codeError, 
            error: `${message} / ErrorMessage: ${error.message}`
        }, codeError)
    }
}