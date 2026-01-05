import { NestFactory } from '@nestjs/core';
import { PostalModule } from './postal/postal.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorGlobalException } from './exceptionFilters/CustomFilterGlobal';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PostalModule,{ logger: ['error', 'warn', 'log'] });
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new ErrorGlobalException()
  );
  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist:true, forbidNonWhitelisted:true, transformOptions: {
      enableImplicitConversion: true, 
    },}));
     const config = new DocumentBuilder()
    .setTitle('Postal Api')
    .setDescription('The Postal API description')
    .setVersion('1.0')
    .addTag('postal')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
