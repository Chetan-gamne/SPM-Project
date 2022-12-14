import {
  Post,
  Get,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Controller,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';

import { FileDTO, FileResponseDTO } from './dto/UploadFileDTO';
import { storageService } from './storage.service';

@Controller('upload')
export class storageController {
  constructor(private readonly uploadImageService: storageService) {}

  @Get()
  getHandShake(): string {
    return 'Handshake is Successful';
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file', { limits: { files: 1 } }))
  @ApiResponse({ status: HttpStatus.CREATED, type: FileResponseDTO })
  async upload(@UploadedFile() file: FileDTO, @Res() response) {
    try {
      // console.log(file);
      const data: FileResponseDTO = await this.uploadImageService.upload(file);
      return response.status(200).json({
        message: `Image ${file.originalname} uploaded to S3`,
        data,
      });
    } catch (error: any) {
      return response
        .status(500)
        .json(`Failed to upload image to S3: ${error.message}`);
    }
  }
}
