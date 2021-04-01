import { Service } from "../modules/customer-service/entities/service.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseSeed1617240161997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values([{ price: 50.1, commission: 10, time: 300 }])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values([{ price: 25.8, commission: 15, time: 600 }])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values([{ price: 80, commission: 18.5, time: 700 }])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from(Service).execute();
  }
}
