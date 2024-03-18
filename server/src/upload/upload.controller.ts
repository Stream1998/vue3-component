import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  public constructor() {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 20, { dest: 'uploads' }))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map(({ originalname, filename }) => ({
      originalname: Buffer.from(originalname, 'latin1').toString('utf-8'),
      filename,
    }));
  }
}
