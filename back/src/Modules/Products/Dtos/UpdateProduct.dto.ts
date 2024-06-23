import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @IsOptional()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    price: number

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    stock: number

    @IsString()
    @IsOptional()
    imgUrl: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    category_id: string
}