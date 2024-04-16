import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'Hotel-App',
    password: 'HotelApp2024!',
    database: 'Hotel-App-DB',
    synchronize: false,
    entities: ['src/**/*.entity{.ts, .js}'],
    migrations: ['./src/migrations/*.ts'],
})