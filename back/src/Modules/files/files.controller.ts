import { Controller, Post, Body, Param, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/createFile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../Auth/Guards/Auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Put('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  updateImage(@Param('id') id: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
          new MaxFileSizeValidator ({
              maxSize: 200000,
              message: "El Archivo debe ser menor a 200Kb",
          }),
          new FileTypeValidator({
              fileType: /(jpg|jpeg|png|webp)$/,
          })
      ]
  })
  ) file: Express.Multer.File) {
    return this.filesService.update(id, file);
  }

}
