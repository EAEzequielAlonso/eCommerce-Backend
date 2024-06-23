import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Products/Entities/Product.entity';
import { File } from './entities/file.entity';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FilesRepository } from './files.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product, File])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, CloudinaryConfig, FilesRepository],
})
export class FilesModule {}
