import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GoogleSheetsService } from './google-sheets.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SynchronizeProductsService } from './synchronize-products.service';
import {
  ModelRepository,
  SizeRepository,
  ProductRepository,
} from '../common/repositories';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    TasksService,
    GoogleSheetsService,
    ProductRepository,
    SynchronizeProductsService,
    SizeRepository,
    ModelRepository,
  ],
})
export class SharedModule {}
