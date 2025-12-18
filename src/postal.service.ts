import { Injectable, NotFoundException } from '@nestjs/common';
import { PostalRepository } from './repository/repository';
import { S3Service } from './ModuleS3/s3.service';
import { PostalEntity } from './model/postal.model';
import type { Express } from 'express';
import {
  CreatePostalRequest,
  CreatePostalResponse,
  PostalOutput,
} from './postal/dto/create-postal.dto';

@Injectable()
export class PostalService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly postalRepository: PostalRepository,
  ) {}

  async createPostal(
    dto: CreatePostalRequest,
    file: Express.Multer.File,
  ): Promise<CreatePostalResponse> {
    // Upload image to S3
    const imageKey: string = await this.s3Service.uploadImage(file);

    // Map to PostalEntity
    const postal: Partial<PostalEntity> = {
      fromName: dto.fromName,
      toName: dto.toName,
      message: dto.message,
      imageKey,
    };

    // Save postal in DB
    const savedPostal = await this.postalRepository.savePostal(postal);

    return new CreatePostalResponse(savedPostal.slug);
  }

  async findBySlug(slug: string): Promise<PostalOutput> {
    // Search postal in DB
    const postalEntity = await this.postalRepository.findPostalBySlug(slug);

    if (!postalEntity) {
      throw new NotFoundException('Postal no encontrada');
    }

    // Generate presigned URL (valid 1 hour = 3600 seconds)
    const imageUrl = await this.s3Service.generatePresignedUrl(
      postalEntity.imageKey,
      3600,
    );

    return new PostalOutput(
      postalEntity.id,
      postalEntity.slug,
      postalEntity.fromName,
      postalEntity.toName,
      postalEntity.message,
      imageUrl,
    );
  }
}
