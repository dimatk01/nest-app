import * as Joi from 'joi';
declare const _default: {
    envFilePath: string;
    validationSchema: Joi.ObjectSchema<any>;
    load: (((() => {
        type: string;
        host: string;
        password: string;
        port: string;
        name: string;
        username: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        type: string;
        host: string;
        password: string;
        port: string;
        name: string;
        username: string;
    }>) | ((() => {
        sheet_id: string;
        client_email: string;
        private_key: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        sheet_id: string;
        client_email: string;
        private_key: string;
    }>))[];
    isGlobal: boolean;
};
export default _default;
