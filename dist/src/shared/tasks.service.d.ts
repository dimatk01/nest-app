import { GoogleSheetsService } from './google-sheets.service';
import { ConfigService } from '@nestjs/config';
import { SynchronizeProductsService } from './synchronize-products.service';
export declare class TasksService {
    private readonly googleSheetsService;
    private readonly synchronizeProducts;
    private readonly configService;
    private readonly googleSheetsId;
    private readonly logger;
    constructor(googleSheetsService: GoogleSheetsService, synchronizeProducts: SynchronizeProductsService, configService: ConfigService);
    handleCron(): Promise<void>;
}
