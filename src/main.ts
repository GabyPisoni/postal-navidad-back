import { NestFactory } from '@nestjs/core';
import { PostalModule } from './postal.module';


async function bootstrap() {
  const app = await NestFactory.create(PostalModule);
  app.enableCors({ origin: true, credentials: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
