import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleSheetsService } from './googleSheets.service';
import { mapProductData } from '../common/helpers/mapProductData';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  private readonly googleSheetsId: string;
  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly configService: ConfigService,
  ) {
    this.googleSheetsId = configService.get('google.sheet_id');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const data = await this.googleSheetsService.getAllSheetData(
      this.googleSheetsId,
    );
    const mappedProducts = mapProductData(data);
    console.log(mappedProducts);
  }
}
