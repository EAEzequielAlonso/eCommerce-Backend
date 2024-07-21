import { Controller, Post, Body, Param, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/createFile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../Auth/Guards/Auth.guard';
import { ErrorManager } from '../../Utils/ErrorManager';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Files")
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFile: CreateFileDto) {

    return ErrorManager ({
              functionTry: () => this.filesService.create(createFile), 
              message: "Error al intentar Cargar la Imagen"})
  }

  @ApiBearerAuth()
  @Put('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  updateImage(
    @Param('id', ParseUUIDPipe) id: string, 
    @UploadedFile(
        new ParseFilePipe({
          validators: [
              new MaxFileSizeValidator ({
                  maxSize: 2000000,
                  message: "El Archivo debe ser menor a 200Kb",
              }),
              new FileTypeValidator({
                  fileType: /(.jpg|.jpeg|.png|.webp)$/,
              })
            ]
          })
    ) file: Express.Multer.File) {

    return ErrorManager ({
          functionTry:() => this.filesService.update(id, file), 
          message: "Error al intentar actualizar la imagen"})
  }

}
