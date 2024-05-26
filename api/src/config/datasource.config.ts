import { DataSourceOptions } from 'typeorm';


const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, DB_HOST} = process.env;

const migPath = 'dist/migrations/*.{ts,js}'
const entPath = 'dist/**/*.entity.{ts,js}'

export const getConfig = (): DataSourceOptions => {
    return {
        type: 'mariadb',
        host: DB_HOST,
        port: 3306,
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        synchronize: false,
        migrations: [migPath],
        entities: [entPath],
    }
}