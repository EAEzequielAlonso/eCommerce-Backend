import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    name: string

    @IsEmail()
    email: string

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    @MinLength(8, {message: 'Password must be at least 8 characters long.' })
    @MaxLength(15, {message: 'Password must not exceed 15 characters.' })
    password: string

    @MinLength(3, {message: 'Address must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Address must not exceed 80 characters.' })
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    country: string | undefined

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    city: string | undefined
}