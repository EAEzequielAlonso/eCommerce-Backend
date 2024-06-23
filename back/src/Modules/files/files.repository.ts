import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/createFile.dto";
import { Product } from "../Products/Entities/Product.entity";
import { CloudinaryService } from "./cloudinary.service";

@Injectable()
export class FilesRepository {
    
    constructor(
        @InjectRepository(File) private fileRepository:Repository<File>,
        @InjectRepository(Product) private productRepository:Repository<Product>,
        private readonly cloudinaryService: CloudinaryService) {}

    async update(id: string, file: Express.Multer.File) {
        const product = await this.productRepository.findOneBy({id})
        if (product) {
            const newfile= new File();
            newfile.name = file.originalname;
            newfile.mimeType= file.mimetype;
            newfile.data = file.buffer;
            newfile.product=product;
            const image= await this.cloudinaryService.uploadImage(file);
            product.imgUrl = image.url
            await this.productRepository.save(product);
            await this.fileRepository.save(newfile);
            return product;
        } else {
            throw new Error("El producto no existe")
        }
        return "";
      }

      async saveFile({name, mimeType, data, product}: CreateFileDto) {
        const newfile= new File();
        newfile.name = name;
        newfile.mimeType= mimeType;
        newfile.data = data;
        newfile.product=product;

        return this.fileRepository.save(newfile);
    }
}