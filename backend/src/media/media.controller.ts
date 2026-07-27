import { Controller, Get, Param, StreamableFile, NotFoundException, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

@Controller('media')
export class MediaController {
  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res({ passthrough: true }) res: Response): StreamableFile {
    const filePath = path.join(process.cwd(), 'media', 'images', filename);
    
    if (!fs.existsSync(filePath)) {
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
