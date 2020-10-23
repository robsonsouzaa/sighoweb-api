import {MigrationInterface, QueryRunner} from "typeorm";

export default class PopulaSetorHospital1603462526047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(1,1);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(1,2);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(1,3);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(2,1);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(2,5);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(2,4);

          INSERT INTO hospital_setor(hospital_id, setor_id)
          VALUES(2,6);

          `,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM hospital_setor;');
    }

}
