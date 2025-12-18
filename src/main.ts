import { NestFactory } from '@nestjs/core';
import { PostalModule } from './postal.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(PostalModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist:true, forbidNonWhitelisted:true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
