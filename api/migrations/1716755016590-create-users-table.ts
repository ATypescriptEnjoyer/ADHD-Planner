import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1716755016590 implements MigrationInterface {
    name = 'CreateUsersTable1716755016590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` uuid NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
