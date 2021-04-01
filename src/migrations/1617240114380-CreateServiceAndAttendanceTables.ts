import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServiceAndAttendanceTables1617240114380 implements MigrationInterface {
  name = 'CreateServiceAndAttendanceTables1617240114380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "time" numeric NOT NULL, "commission" numeric NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "finished" boolean NOT NULL DEFAULT false, "duration" numeric, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance_services" ("attendanceId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_223fda7a2146758dd33d2941f25" PRIMARY KEY ("attendanceId", "serviceId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92af6ebb7e5ae55330f83a5459" ON "attendance_services" ("attendanceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9be6992102d3715b7e3594a3f3" ON "attendance_services" ("serviceId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance_services" ADD CONSTRAINT "FK_92af6ebb7e5ae55330f83a54592" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance_services" ADD CONSTRAINT "FK_9be6992102d3715b7e3594a3f3d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance_services" DROP CONSTRAINT "FK_9be6992102d3715b7e3594a3f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance_services" DROP CONSTRAINT "FK_92af6ebb7e5ae55330f83a54592"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_9be6992102d3715b7e3594a3f3"`);
    await queryRunner.query(`DROP INDEX "IDX_92af6ebb7e5ae55330f83a5459"`);
    await queryRunner.query(`DROP TABLE "attendance_services"`);
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
