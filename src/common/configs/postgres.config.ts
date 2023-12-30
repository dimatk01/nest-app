import * as Entity from '../../../db/entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default {
  import: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: configService.get('db.type'),
    host: configService.get('db.host'),
    database: configService.get('db.name'),
    username: configService.get('db.username'),
    password: configService.get('db.password'),
    port: configService.get('db.port'),
    entities: Object.values(Entity),
    synchronize: true,
    logging: ['error'],
  }),
};
