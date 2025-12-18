import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private readonly formatImg: string[] = ['png', 'jpg', 'jpeg', 'gif'];

  constructor(
    private readonly config: ConfigService,
    private readonly s3: S3Client,
  ) {}

  private isValidImageExtension(ext: string): boolean {
    return this.formatImg.includes(ext.toLowerCase());
  }

  async uploadImage(file: any): Promise<string> {
    //Container S3 name
    const bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET');
    const extFile = (file.originalname.split('.').pop() || '').toLowerCase();

    if (!this.isValidImageExtension(extFile)) {
      throw new BadRequestException(
        'Error format type image. Formats approved are: png, jpg, jpeg, gif',
      );
    }
    //Unique file name
    const key = `${uuid()}.${extFile}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return key;
    } catch (e) {
      throw new InternalServerErrorException('Error uploading file to S3');
    }
  }

  async generatePresignedUrl(
    key: string,
    expiresInSeconds = 3600,
  ): Promise<string> {
    const bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET');
    const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3, cmd, { expiresIn: expiresInSeconds });
  }
}
