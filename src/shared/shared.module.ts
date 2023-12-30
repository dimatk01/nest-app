import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GoogleSheetsService } from './google-sheets.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductRepository } from '../common/repositories/product.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService, GoogleSheetsService, ProductRepository],
})
export class SharedModule {}
