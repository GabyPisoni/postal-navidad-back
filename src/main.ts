import { NestFactory } from '@nestjs/core';
import { PostalModule } from './postal/postal.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorGlobalException } from './exceptionFilters/CustomFilterGlobal';

async function bootstrap() {
  const app = await NestFactory.create(PostalModule,{ logger: ['error', 'warn', 'log'] });
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new ErrorGlobalException()
  );
  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist:true, forbidNonWhitelisted:true, transformOptions: {
      enableImplicitConversion: true, 
    },}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
