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
import { S3Service } from '../moduleS3/s3.service';
import { PostalService } from '../postal/postal.service';
import {
  CreatePostalRequest,
  CreatePostalResponse,
  PostalOutput,
} from './dto/create-postal.dto';
import { PostalGuard } from 'src/guards/postalAvailable.guard';
import { ValidationFilePipe } from 'src/pipes/validationFile.pipe';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  GET_RESPONSES_OK_SWAGGER,
  POST_RESPONSES_OK_SWAGGER,
  UNAUTHORIZED_TOKEN,
  UPLOAD_BAD_REQUEST_SWAGGER,
} from 'src/utils/const';

@Controller('/api/postal')
export class PostalController {
  constructor(
    private readonly postalService: PostalService,
    private readonly s3Service: S3Service,
  ) {}
  @UseGuards(PostalGuard)
  @ApiOperation({ summary: 'GET - POSTAL CARD', description: 'Returns a postal card by slug' })
  @ApiQuery({ name: 'slug', description: 'The slug identifier of the postal card to retrieve' })
  @ApiResponse({ status: 200, description: 'Postal card found successfully', type: PostalOutput, example: GET_RESPONSES_OK_SWAGGER })
  @ApiResponse({ status: 401, description: 'Unauthorized', example: UNAUTHORIZED_TOKEN })
  @ApiResponse({ status: 404, description: 'Postal card not found' })
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<PostalOutput> {
    return this.postalService.findBySlug(slug);
  }

  @UseGuards(PostalGuard)
  @ApiOperation({ summary: 'POST - CREATE POSTAL', description: 'Creates a postal card with an attached image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePostalRequest,
    description: 'Postal card data',
  })
  @ApiResponse({ status: 201, type: CreatePostalResponse, example: POST_RESPONSES_OK_SWAGGER })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      timestamp: '2026-01-01T00:00:00.000Z',
      path: '/api/postal',
      message: 'file is required',
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized', example: UNAUTHORIZED_TOKEN })
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async createPostal(
    @Body() body: CreatePostalRequest,
    @UploadedFile(new ValidationFilePipe()) file: Express.Multer.File,
  ): Promise<CreatePostalResponse> {
    const { fromName, toName, message } = body;
    const reqBody: CreatePostalRequest = { fromName, toName, message };
    return this.postalService.createPostal(reqBody, file);
  }

  @UseGuards(PostalGuard)
  @ApiOperation({ summary: 'POST - UPLOAD IMAGE', description: 'Uploads an image to S3/LocalStack' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image file',
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: String,
    example: '234234-fgda-9459-5645-1289030890a.png',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized', example: UNAUTHORIZED_TOKEN })
  @ApiResponse({ status: 400, description: 'Bad Request', example: UPLOAD_BAD_REQUEST_SWAGGER })
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024, files: 1 },
    }),
  )
  async uploadImage(
    @UploadedFile(new ValidationFilePipe()) file: Express.Multer.File,
  ): Promise<string> {
    return this.s3Service.uploadImage(file);
  }
}
