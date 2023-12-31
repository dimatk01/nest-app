import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleSheetsService } from './google-sheets.service';
import { mapProductData } from '../common/helpers/mapProductData';
import { ConfigService } from '@nestjs/config';
import { MappedProducts } from '../common/types/mappedProduct';
import { GoogleSheetData } from '../common/types/googleSheetData';
import { SynchronizeProductsService } from './synchronize-products.service';

/* The TasksService class is responsible for handling a cron job that retrieves data from a Google
Sheet, maps it to a specific format, and synchronizes it with a product service. */
@Injectable()
export class TasksService {
  private readonly googleSheetsId: string;

  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly synchronizeProducts: SynchronizeProductsService,
    private readonly configService: ConfigService,
  ) {
    this.googleSheetsId = configService.get('google.sheet_id');
  }

  /**
   * The `handleCron` function retrieves data from a Google Sheet, maps the data to a specific format,
   * and then synchronizes the products using the mapped data.
   */
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const googleSheetData: GoogleSheetData =
      await this.googleSheetsService.getAllSheetData(this.googleSheetsId);
    const mappedProducts: MappedProducts[] = mapProductData(googleSheetData);
    await this.synchronizeProducts.synchronize(mappedProducts);
  }
}
