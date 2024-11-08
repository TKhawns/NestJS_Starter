import { DataSourceOptions } from "typeorm";

require('dotenv').config();

const ormConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}"]
};
export default ormConfig;
