import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'people-exchange',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`./src/db/migrations`],
  synchronize: true,
});

export default connectionSource;

