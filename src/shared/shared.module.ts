import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GoogleSheetsService } from './googleSheets.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService, GoogleSheetsService],
})
export class SharedModule {}
