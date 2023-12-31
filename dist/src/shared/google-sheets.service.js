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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const config_1 = require("@nestjs/config");
let GoogleSheetsService = class GoogleSheetsService {
    constructor(configService) {
        this.configService = configService;
        this.client_email = configService.get('google.client_email');
        this.private_key = configService.get('google.private_key');
    }
    async getAllSheetData(spreadsheetId) {
        const auth = await this.authorize();
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
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
        }
        catch (err) {
            console.error('The API returned an error:', err);
            throw err;
        }
    }
    async getSheetData(spreadsheetId, range) {
        const auth = await this.authorize();
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            return response.data.values;
        }
        catch (err) {
            console.error('The API returned an error:', err);
            throw err;
        }
    }
    async authorize() {
        const scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ];
        return new google_auth_library_1.JWT({
            email: this.client_email,
            key: this.private_key,
            scopes,
        });
    }
};
exports.GoogleSheetsService = GoogleSheetsService;
exports.GoogleSheetsService = GoogleSheetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleSheetsService);
//# sourceMappingURL=google-sheets.service.js.map