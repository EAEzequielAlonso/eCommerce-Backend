import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {

  constructor (private readonly filesRepository: FilesRepository) {}

  create(createFile: Partial<File>) {
    return this.filesRepository.saveFile(createFile);
  }

  update(id: string, file: Express.Multer.File) {
    return this.filesRepository.update(id, file);
  }
}
