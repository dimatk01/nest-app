"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const google_sheets_service_1 = require("./google-sheets.service");
const schedule_1 = require("@nestjs/schedule");
const synchronize_products_service_1 = require("./synchronize-products.service");
const repositories_1 = require("../common/repositories");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        providers: [
            tasks_service_1.TasksService,
            google_sheets_service_1.GoogleSheetsService,
            repositories_1.ProductRepository,
            synchronize_products_service_1.SynchronizeProductsService,
            repositories_1.SizeRepository,
            repositories_1.ModelRepository,
        ],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map