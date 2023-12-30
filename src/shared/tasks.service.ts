import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleSheetsService } from './google-sheets.service';
import { mapProductData } from '../common/helpers/mapProductData';
import { ConfigService } from '@nestjs/config';
import { ProductRepository } from '../common/repositories/product.repository';
import { MappedProducts } from '../common/types/mappedProduct';
import { GoogleSheetData } from '../common/types/googleSheetData';

@Injectable()
export class TasksService {
  private readonly googleSheetsId: string;
  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly configService: ConfigService,
    private readonly productRepository: ProductRepository,
  ) {
    this.googleSheetsId = configService.get('google.sheet_id');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const googleSheetData: GoogleSheetData =
      await this.googleSheetsService.getAllSheetData(this.googleSheetsId);
    const mappedProducts: MappedProducts[] = mapProductData(googleSheetData);
    await this.synhronizeModels(googleSheetData);
    // await this.productRepository.save(mappedProducts)
  }
}
