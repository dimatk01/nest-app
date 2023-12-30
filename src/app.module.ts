import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './common/configs/postgres.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import envConfig from './common/configs/env.config';
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./shared/tasks.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(postgresConfig as TypeOrmModuleAsyncOptions),
    ConfigModule.forRoot(envConfig),
    ScheduleModule.forRoot()
  ],
  providers: [TasksService],
})
export class AppModule {}
