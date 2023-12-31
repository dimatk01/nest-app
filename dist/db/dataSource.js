"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Entities = require("./entities/index");
const process_1 = require("process");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process_1.default.env.DB_HOST,
    port: Number(process_1.default.env.DB_PORT),
    username: process_1.default.env.DB_USERNAME,
    password: process_1.default.env.DB_PASSWORD,
    database: process_1.default.env.DB_NAME,
    entities: Object.values(Entities),
    migrations: ['./db/migrations/*.ts'],
    synchronize: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
//# sourceMappingURL=dataSource.js.map