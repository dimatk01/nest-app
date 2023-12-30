import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule";
import { GoogleSheetsService } from "./googleSheets.service";

@Injectable()
export class TasksService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {
  }

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
   const data = await this.googleSheetsService.getAllSheetData('1bjqDqLZgjZSZ_fOBolseUDg7L0ktG50BlD9tAYm4rwg')
    this.logger.debug("Called every 30 seconds", data);
    const mappedData = data.map((category) => {
      const sheetTitle = category.sheetTitle;
      const data = category.data;

      const getFieldIndex = (fieldName) => {
        const rowIndex = data.findIndex((row) => row.includes(fieldName));
        return rowIndex !== -1 ? rowIndex : null;
      };

      const modelsIndex = getFieldIndex("Імя ");
      const pricesIndex = getFieldIndex("Ціна");
      const codesIndex = getFieldIndex("Код товару");
      const sizesIndex = getFieldIndex("Розміри");

      if (modelsIndex === null || pricesIndex === null || codesIndex === null || sizesIndex === null) {
        console.error(`Required fields not found in data for category: ${sheetTitle}`);
        return [];
      }

      const modelsRow = data[modelsIndex].slice(1);
      const pricesRow = data[pricesIndex].slice(1);
      const codesRow = data[codesIndex].slice(1);
      const sizesColumn = data.slice(sizesIndex + 1);


      const items = modelsRow.map((model, index) => {
        return {
          sheetTitle,
          model: model.trim(),
          price: pricesRow[index].trim(),
          code: codesRow[index].trim(),
          sizes: sizesColumn.map((size) => (data[sizesColumn.indexOf(size) + 7][index] === '+' ? size : '')).filter(Boolean),
        };
      });

      return items;
    }).flat();

    console.log(mappedData);
  }
}