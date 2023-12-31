import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
export declare class GoogleSheetsService {
    private readonly configService;
    private readonly client_email;
    private readonly private_key;
    constructor(configService: ConfigService);
    getAllSheetData(spreadsheetId: string): Promise<any>;
    private getSheetData;
    authorize(): Promise<JWT>;
}
