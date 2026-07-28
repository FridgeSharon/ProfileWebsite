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
    const filePath = path.resolve(basePath, filename);

    if (!filePath.startsWith(basePath + path.sep)) {
      throw new BadRequestException('Invalid path');
    }

    const resolvedPath = this.resolveExistingFilePath(filePath, filename);
    if (!resolvedPath) {
      throw new NotFoundException('Image not found');
    }

    const stat = fs.statSync(resolvedPath, { throwIfNoEntry: false });
    if (!stat || !stat.isFile()) {
      throw new NotFoundException('Image not found');
    }

    const mimeType = mime.lookup(resolvedPath) || 'application/octet-stream';
    res.set({
      'Content-Type': mimeType,
    });

    const file = fs.createReadStream(resolvedPath);
    return new StreamableFile(file);
  }

  private resolveExistingFilePath(filePath: string, filename: string): string | null {
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    if (filename.endsWith('.jpg')) {
      const altPath = filePath.replace(/\.jpg$/, '.jpeg');
      if (fs.existsSync(altPath)) return altPath;
    } else if (filename.endsWith('.jpeg')) {
      const altPath = filePath.replace(/\.jpeg$/, '.jpg');
      if (fs.existsSync(altPath)) return altPath;
    }

    return null;
  }
}
