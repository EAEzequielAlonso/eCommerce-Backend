import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number

    @IsString()
    @IsOptional()
    imgUrl: string

    @IsNotEmpty()
    @IsString()
    category_id: string
}