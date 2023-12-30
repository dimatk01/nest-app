import { Injectable } from "@nestjs/common";
import { google } from "googleapis";

@Injectable()
export class GoogleSheetsService {
  private readonly sheets = google.sheets('v4');

  async getSheetData(sheetId: string, sheetName: string) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetName,
    });

    return response.data.values;
  }
}
