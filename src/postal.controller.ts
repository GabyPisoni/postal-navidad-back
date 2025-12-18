import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { PostalService } from './postal.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import multer from 'multer';
import {
  CreatePostalRequest,
  CreatePostalResponse,
  PostalOutput,
} from './postal/dto/create-postal.dto';
import { S3Service } from './ModuleS3/s3.service';

@Controller("/api/postal")
export class PostalController {
  constructor(
    private readonly postalService: PostalService,
    private readonly s3Service: S3Service,
  ) {}

  @Get(":slug")
  async findBySlug(@Param("slug") slug: string): Promise<PostalOutput> {
    return this.postalService.findBySlug(slug);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
    }),
  )
  async createPostal(
    @Body() body: CreatePostalRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreatePostalResponse> {
    return this.postalService.createPostal(body, file);
  }

  @Post("/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.s3Service.uploadImage(file);
  }
}
