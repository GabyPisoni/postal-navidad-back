import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationFilePipe implements PipeTransform {
    private readonly allowedMimeTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];

    transform(value: Express.Multer.File, _metadata: ArgumentMetadata): Express.Multer.File {
        if (!value) {
            throw new BadRequestException('file is required');
        }

        if (!this.allowedMimeTypes.includes(value.mimetype)) {
            throw new BadRequestException('Unsupported file type');
        }

        const buffer = value.buffer;
        if (!buffer || buffer.length < 4) {
            throw new BadRequestException('Invalid file content');
        }

        if (!this.isValidHeadFile(buffer)) {
            throw new BadRequestException('Invalid image signature');
        }

        return value;
    }

    private isValidHeadFile(buffer: Buffer): boolean {
        const isPng =
            buffer.length >= 8 &&
            buffer[0] === 0x89 &&
            buffer[1] === 0x50 &&
            buffer[2] === 0x4e &&
            buffer[3] === 0x47 &&
            buffer[4] === 0x0d &&
            buffer[5] === 0x0a &&
            buffer[6] === 0x1a &&
            buffer[7] === 0x0a;

        const isJpeg =
            buffer.length >= 3 &&
            buffer[0] === 0xff &&
            buffer[1] === 0xd8 &&
            buffer[2] === 0xff;

        const isGif =
            buffer.length >= 6 &&
            buffer[0] === 0x47 &&
            buffer[1] === 0x49 &&
            buffer[2] === 0x46 &&
            buffer[3] === 0x38 &&
            (buffer[4] === 0x37 || buffer[4] === 0x39) &&
            buffer[5] === 0x61;

        return isPng || isJpeg || isGif;
    }
}