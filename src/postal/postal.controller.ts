import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import multer from 'multer';
import { S3Service } from '../ModuleS3/s3.service';
import { PostalService } from '../postal/postal.service';
import { CreatePostalRequest, CreatePostalResponse, PostalOutput } from './dto/create-postal.dto';
import { PostalGuard } from 'src/guards/postalAvailable.guard';
import { ValidationFilePipe } from 'src/pipes/validationFile.pipe';

@Controller('/api/postal')
export class PostalController {
  constructor(
    private readonly postalService: PostalService,
    private readonly s3Service: S3Service,
  ) {}
@UseGuards(PostalGuard)
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<PostalOutput> {
    return this.postalService.findBySlug(slug);
  }
@UseGuards(PostalGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async createPostal(
    @Body('fromName') fromName: string,
    @Body('toName') toName: string,
    @Body('message') message: string,
    @UploadedFile(new ValidationFilePipe()) file: Express.Multer.File,
  ): Promise<CreatePostalResponse> {
    const body: CreatePostalRequest = { fromName, toName, message };
    return this.postalService.createPostal(body, file);
  }
@UseGuards(PostalGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, 
        files: 1,
      },
    }),
  )
  async uploadImage(
    @UploadedFile(new ValidationFilePipe()) file: Express.Multer.File,
  ): Promise<string> {
    return this.s3Service.uploadImage(file);
  }
}
