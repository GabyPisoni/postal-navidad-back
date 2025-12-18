import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { S3Service } from './s3.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: S3Client,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) =>
        new S3Client({
          region: cfg.getOrThrow('AWS_REGION'),
          endpoint: cfg.get('AWS_ENDPOINT'),
          forcePathStyle: true,
          credentials: {
            accessKeyId: cfg.getOrThrow('AWS_ACCESS_KEY_ID'),
            secretAccessKey: cfg.getOrThrow('AWS_SECRET_ACCESS_KEY'),
          },
        }),
    },
    S3Service,
  ],
  exports: [S3Service],
})
export class S3Module {}