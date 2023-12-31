import * as Entity from '../../../db/entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
declare const _default: {
    import: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<{
        type: any;
        host: any;
        database: any;
        username: any;
        password: any;
        port: any;
        entities: (typeof Entity.Size | typeof Entity.Product | typeof Entity.Category | typeof Entity.SubCategory | typeof Entity.Brand | typeof Entity.Model)[];
        synchronize: boolean;
        ssl: boolean;
        logging: string[];
    }>;
};
export default _default;
