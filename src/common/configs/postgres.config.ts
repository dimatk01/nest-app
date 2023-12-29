import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Entity from '../../../db/entities/index'

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
    synchronize: false,
    logging: ['error'],
  }),
}
