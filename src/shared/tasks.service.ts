import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleSheetsService } from './googleSheets.service';
import { mapProductData } from '../common/helpers/mapProductData';

@Injectable()
export class TasksService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {
  }


  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const data = await this.googleSheetsService.getAllSheetData(
      '1bjqDqLZgjZSZ_fOBolseUDg7L0ktG50BlD9tAYm4rwg',
    );
    const mappedProducts = mapProductData(data);
  }
}