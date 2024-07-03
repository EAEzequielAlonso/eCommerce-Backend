import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/Modules/Products/Entities/Product.entity";

export class CreateFileDto {

    @ApiProperty({
        description: "Es el nombre de la Imagen a Guardar",
        example: "ImageSamsungX20.webp",
    })
    name: string;

    @ApiProperty({
        description: "Es el Tipo de Archivo guardado",
        example: "image/webp",
    })
    mimeType: string;

    @ApiProperty({
        description: "Es un búfer que contiene el archivo completo.",
    })
    data: Buffer;

    @ApiProperty({
        description: "Es el producto al cual sera asignada la imagen",
    })
    product: Product;
}
