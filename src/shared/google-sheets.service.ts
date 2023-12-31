import { Injectable } from '@nestjs/common';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
/* The GoogleSheetsService class is responsible for retrieving data from Google Sheets using the Google
Sheets API. */
export class GoogleSheetsService {
  private readonly client_email: string;
  private readonly private_key: string;

  constructor(private readonly configService: ConfigService) {
    this.client_email = configService.get('google.client_email');
    this.private_key = configService.get('google.private_key');
  }

  /**
   * The function `getAllSheetData` retrieves all the data from all sheets in a Google Sheets
   * spreadsheet.
   * @param {string} spreadsheetId - The spreadsheetId parameter is a string that represents the unique
   * identifier of the Google Sheets spreadsheet. It is used to specify which spreadsheet to retrieve
   * data from.
   * @returns an array of objects, where each object represents a sheet in the spreadsheet. Each object
   * contains the sheet title and the data from that sheet.
   */
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

  /**
   * The function `getSheetData` retrieves data from a specified range in a Google Sheets spreadsheet
   * using the Google Sheets API.
   * @param {string} spreadsheetId - The spreadsheetId is a unique identifier for a Google Sheets
   * document. It can be found in the URL of the spreadsheet. It is a long string of characters and
   * numbers.
   * @param {string} range - The range parameter specifies the range of cells to retrieve data from in
   * the spreadsheet. It should be in A1 notation, for example "Sheet1!A1:B5" to retrieve data from
   * cells A1 to B5 in Sheet1.
   * @returns the values from the specified range in a Google Sheets spreadsheet.
   */
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

  /**
   * The `authorize` function returns a JWT object with the specified email, private key, and scopes.
   * @returns The code is returning a new instance of the JWT class with the specified email, private
   * key, and scopes.
   */
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
