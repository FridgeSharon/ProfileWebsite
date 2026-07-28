import {
  Controller,
  Get,
  Param,
  StreamableFile,
  NotFoundException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

@Controller('media')
export class MediaController {
  @Get('images/:filename')
  getImage(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const possibleBasePaths = [
      path.resolve(process.cwd(), 'media', 'images'),
      path.resolve(process.cwd(), 'backend', 'media', 'images'),
      path.resolve(__dirname, '..', '..', '..', 'media', 'images'),
      path.resolve(__dirname, '..', '..', 'media', 'images'),
    ];

    const basePath = possibleBasePaths.find((p) => fs.existsSync(p)) || possibleBasePaths[0];
    let filePath = path.resolve(basePath, filename);

    if (!filePath.startsWith(basePath + path.sep)) {
      throw new BadRequestException('Invalid path');
    }

    if (!fs.existsSync(filePath)) {
      if (
        filename.endsWith('.jpg') &&
        fs.existsSync(filePath.replace(/\.jpg$/, '.jpeg'))
      ) {
        filePath = filePath.replace(/\.jpg$/, '.jpeg');
      } else if (
        filename.endsWith('.jpeg') &&
        fs.existsSync(filePath.replace(/\.jpeg$/, '.jpg'))
      ) {
        filePath = filePath.replace(/\.jpeg$/, '.jpg');
      } else {
        throw new NotFoundException('Image not found');
      }
    }

    const stat = fs.statSync(filePath, { throwIfNoEntry: false });
    if (!stat || !stat.isFile()) {
      throw new NotFoundException('Image not found');
    }

    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.set({
      'Content-Type': mimeType,
    });

    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }
}
