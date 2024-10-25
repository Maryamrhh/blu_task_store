import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'admin',
  password: process.env.DATABASE_PASSWORD || 'adminpw',
  database: process.env.DATABASE_NAME || 'admindb',
  entities: ['dist/**/*.model.ts'],
  synchronize: true,
});

export default dataSource;
