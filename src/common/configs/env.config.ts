import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const db = registerAs('db', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
}));

export default {
  envFilePath: `.env`,
  validationSchema: Joi.object({
    API_PORT: Joi.string().required(),
    BASE_HOST: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_TYPE: Joi.string().required(),
  }),
  load: [db],
  isGlobal: true,
};
