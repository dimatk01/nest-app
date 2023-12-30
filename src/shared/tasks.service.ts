import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GoogleSheetsService } from "./googleSheets.service";

@Injectable()
export class TasksService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {
  }

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug("Called every 30 seconds");
  }
}