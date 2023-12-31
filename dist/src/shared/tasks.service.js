"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const google_sheets_service_1 = require("./google-sheets.service");
const mapProductData_1 = require("../common/helpers/mapProductData");
const config_1 = require("@nestjs/config");
const synchronize_products_service_1 = require("./synchronize-products.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(googleSheetsService, synchronizeProducts, configService) {
        this.googleSheetsService = googleSheetsService;
        this.synchronizeProducts = synchronizeProducts;
        this.configService = configService;
        this.logger = new common_1.Logger(TasksService_1.name);
        this.googleSheetsId = configService.get('google.sheet_id');
    }
    async handleCron() {
        this.logger.log('Start sync with Google sheet');
        const googleSheetData = await this.googleSheetsService.getAllSheetData(this.googleSheetsId);
        const [mappedProducts, sizes, models] = (0, mapProductData_1.mapProductData)(googleSheetData);
        await this.synchronizeProducts.synchronize(mappedProducts, sizes, models);
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_sheets_service_1.GoogleSheetsService,
        synchronize_products_service_1.SynchronizeProductsService,
        config_1.ConfigService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map