import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// const defaultOptions = {
//   dialect: 'postgres',
//   port: 5432,
//   username: 'user',
//   password: 'password',
//   database: 'db',
//   synchronize: true,
// };

// @Module({
//   imports: [
//     SequelizeModule.forRoot({
//       ...defaultOptions,
//       host: 'user_db_host',
//       models: [User],
//     }),
//     SequelizeModule.forRoot({
//       ...defaultOptions,
//       name: 'albumsConnection',
//       host: 'album_db_host',
//       models: [Album],
//     }),
//   ],
// })
// export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
