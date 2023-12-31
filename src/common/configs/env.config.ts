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

const google = registerAs('google', () => ({
  sheet_id: process.env.G_SHEET_ID,
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY,
}));

export default {
  envFilePath: `.env`,
  validationSchema: Joi.object({
    PORT: Joi.string().required(),
    G_SHEET_ID: Joi.string().required(),
    CLIENT_EMAIL: Joi.string().required(),
    PRIVATE_KEY: Joi.string().required(),
    BASE_HOST: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_TYPE: Joi.string().required(),
  }),
  load: [db, google],
  isGlobal: true,
};
