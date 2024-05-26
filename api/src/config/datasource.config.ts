import { DataSourceOptions } from 'typeorm';


const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, DB_HOST} = Bun.env;

export function getConfig() {
    return {
        type: 'mariadb',
        host: DB_HOST,
        port: 3306,
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        synchronize: false,
        migrations: [__dirname + '/../../migrations/*.{ts,js}'],
        entities: [__dirname + '/../../**/*.entity.{ts,js}'],
    } as DataSourceOptions
}