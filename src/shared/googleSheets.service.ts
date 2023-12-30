import { Injectable } from "@nestjs/common";
import { JWT } from "google-auth-library";
import { google } from "googleapis";

@Injectable()
export class GoogleSheetsService {
  private readonly credentials = {
    type: 'service_account',
    project_id: 'nest-app-409609',
    private_key_id: '371b487c2fafb5d9700c0c4097859f8c1bcceadf',
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnrYMtM4Crdug8\n09bEnEEZ0kgPkbUTvU5ZI2G74/KxYbTs7s9GwRgGzvaVeULsk2dRRmgCHWdZ0np3\nAGwzZ0MRM/OWXrknpx4FNsojnQAWp5tVl9q6jMC67dbfm7f/LpHVoPd3xIFF+9T+\njX72Q+yBx2cCINM6oq0cZ5qUUh9QsdpbpvQubp8b7dfaRm4DfL9WLXTraiqdQs5d\nUA5dmNZQmPSzXJWwCIcx34JJ5nKDAdCu/D7xUq2HZaYb+xAaK+YJEm0LH7GzTyON\nqWWVXYibCBwXeZK0ryJ2l5qeYEWrvns9AsePXtvJQECkdMn5Zyjxm32TTPyXIxKg\n8cI1EwexAgMBAAECggEACWZmxi/u9K3T0yUlExyXYbUyKP1II3UnYUPkhL4AqwUJ\nOYchw5urlyYfGL4VjGGvFxVVW1j+pEBycR1q827EicBZ1YI16w0pV618o4Z3rM10\nndXHg1HEtDYFJ7/5DqszrcA6X1J61MuLY0HXbkLcjWH6WlowvUbFYaRFPC9mZgWb\nBMzEhxvdImbwwb3e8Znzm5ybw+6TIayPdA/fydmKCDaoy7b0B99w6cxWWF2JmqVh\nn4220TWJhu8SpW76J9plYAqJnLuHOh4hzS79VC7UZn7yYNre9f7+th2vKCNyILnT\n6VczbMQVX19/8QEdFyNNwSsTfVrxVanCTkVea5twYQKBgQDsAmf3BI3xy8Hesvrt\nV9zoBaPlE+mVG+sRP7OwOqLcH0MyholvXSpwrElVkOwb5e73LZ1/WilziFv1iNvT\n5pOklTpxO3P3TkZFGtmbtKrVhpbTh9/FWMcXsjW9e0l20Ee677oJCDB4UpPtjQkn\nRby6X6XohF2I5PFv40nMdSXdhQKBgQC14WnRjaFkRW+ezV2SRCibJHw6GWUOc0oA\nzNSKDa+cJL6f3fdC1Z8u0rQgaP6pGbrlbMqV27NHV3z3wEzVb+XugRa3/rG5KkU3\naAao6FoHBSieAEELUBBoDzCU9lA0b+IDHLXO1dAsUNiwJbNl7KK0fquJmdhFP20k\nwmq72SjzPQKBgE5HSgZjS1U8mNPtl06risimPkMXxKzBMslo0IeOG0BZWidi+iim\nxRHUAwrPY5CpRgZT6d44oHECdEXPG+J/os6+9EBkUMVg/+uhyTVcyiDCYDpO4ciJ\n9pcEc9CiGK7AzFnTc2fVgIYYFZp/4d5VwhAq81NYu9FQ5kePIoYfAO0lAoGBAKiV\nmYn9J11T5xRg8pyCxMiY1vTbWQo93phDQ7X63Y1zmaWBDpFKhNPXxdJMv89p5AyH\n/HdPPyufclwKSK2FnLCnwrElSQKCpcmniJTDWb8sDuv0/FVKDwsFGVjZvpn8IpgT\n4oknMmABR/ht2Y1d+6olx0Yx7X6yPa5W7qvTq9tZAoGBALvmAnqQQ+Kb5SWnO9Qb\n9nyPIQNRaykSmy1ug/usZVysNiyFfNYUIapre3irjq43i9OOsv/+mknico/DO7wy\nQeC5flZ7TX07WTN+Iy4ReZqHs9T6oH5orc5/4Ki15pJkb/MdZhlbe5RsyqPbaWsb\nQt2hUilVwBGMYMSH8QhGZ3qk\n-----END PRIVATE KEY-----\n",
    "client_email": "nest-app@nest-app-409609.iam.gserviceaccount.com",
    "client_id": "100511923638294163691",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nest-app%40nest-app-409609.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
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

  private async getSheetData(spreadsheetId: string, range: string): Promise<any> {
    const auth = await this.authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const values = response.data.values;
      return values;
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
      email: this.credentials.client_email ?? "nest-app@nest-app-409609.iam.gserviceaccount.com",
      key: this.credentials.private_key ?? "AIzaSyAabsohu6dX4F_T2GjVj45vFFz3Okb6QSU",
      scopes
    });
  }
}