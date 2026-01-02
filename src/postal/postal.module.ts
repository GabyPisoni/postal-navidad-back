import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from '../moduleS3/s3.module';
import { PostalRepository } from '../repository/repository';
import { PostalEntity } from '../model/postal.model';
import { PostalController } from './postal.controller';
import { PostalService } from './postal.service';
import { PostalGuard } from 'src/guards/postalAvailable.guard';

//Config for TypeORM with Postgres
/**https://docs.nestjs.com/techniques/database */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      // With injectable ConfigService for environment variables
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: Number(cfg.get<string>('DB_PORT')) || 5432,
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    S3Module,
    TypeOrmModule.forFeature([PostalEntity]),
  ],
  controllers: [PostalController],
  providers: [PostalService, PostalRepository,PostalGuard],
  
})
export class PostalModule {}