"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity = require("../../../db/entities/index");
const config_1 = require("@nestjs/config");
exports.default = {
    import: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: configService.get('db.type'),
        host: configService.get('db.host'),
        database: configService.get('db.name'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        port: configService.get('db.port'),
        entities: Object.values(Entity),
        synchronize: true,
        ssl: true,
        logging: ['error'],
    }),
};
//# sourceMappingURL=postgres.config.js.map