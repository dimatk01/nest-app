import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './common/configs/postgres.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import envConfig from './common/configs/env.config';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(postgresConfig as TypeOrmModuleAsyncOptions),
    ConfigModule.forRoot(envConfig),
    SharedModule,
    ProductModule,
  ],
})
export class AppModule {}
