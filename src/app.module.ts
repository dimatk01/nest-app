import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './common/configs/postgres.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import envConfig from './common/configs/env.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(postgresConfig as TypeOrmModuleAsyncOptions),
    ConfigModule.forRoot(envConfig),
  ],
  providers: [],
})
export class AppModule {}
