import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GoogleSheetsService } from "./googleSheets.service";

@Injectable()
export class TasksService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {
  }

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
   const data = await this.googleSheetsService.getSheetData('1bjqDqLZgjZSZ_fOBolseUDg7L0ktG50BlD9tAYm4rwg')
    this.logger.debug("Called every 30 seconds");
  }
}