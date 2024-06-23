import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/createFile.dto';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {

  constructor (private readonly filesRepository: FilesRepository) {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: string, file: Express.Multer.File) {
    return this.filesRepository.update(id, file);
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
