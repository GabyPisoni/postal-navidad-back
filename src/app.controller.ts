import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller("/api/postal")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":slug")
  getHello(@Param("slug") slug: string
): string {
    return this.appService.getHello();
  }
 @Post("")
 @UseInterceptors(FileInterceptor("file"))
 //Usar el type Express.Multer.File para el file de la 18 al tiparlo
  createPostalResponse(@Body() body: any, @UploadedFile() file: any) {
    // Implement the image upload logic here
  }
  @Post("/upload")
  uploadImage() {
    // Implement the image upload logic here
  }
}
