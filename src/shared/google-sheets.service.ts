import { Injectable } from '@nestjs/common';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetsService {
  private readonly client_email: string;
  private readonly private_key: string;

  constructor(private readonly configService: ConfigService) {
    this.client_email = configService.get('google.client_email');
    this.private_key = configService.get('google.private_key');
  }

  async getAllSheetData(spreadsheetId: string): Promise<any> {
    const auth = await this.authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      const sheetsData = response.data.sheets;
      const allData = [];

      for (const sheet of sheetsData) {
        const range = `${sheet.properties.title}!A1:Z`;
        const sheetData = await this.getSheetData(spreadsheetId, range);
        allData.push({ sheetTitle: sheet.properties.title, data: sheetData });
      }

      return allData;
    } catch (err) {
      console.error('The API returned an error:', err);
      throw err;
    }
  }

  private async getSheetData(
    spreadsheetId: string,
    range: string,
  ): Promise<any> {
    const auth = await this.authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      return response.data.values;
    } catch (err) {
      console.error('The API returned an error:', err);
      throw err;
    }
  }

  async authorize() {
    const scopes = [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ];
    return new JWT({
      email: this.client_email,
      key: this.private_key,
      scopes,
    });
  }
}
