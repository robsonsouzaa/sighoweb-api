import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriaTabelaHospitalSetor1601669015714
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hospital_setor',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'hospital_id',
            type: 'integer',
          },
          {
            name: 'setor_id',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('hospital_setor', [
      new TableForeignKey({
        name: 'HospitalSetorHospital',
        columnNames: ['hospital_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'hospital',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'HospitalSetorSetor',
        columnNames: ['setor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'setor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('hospital_setor', 'HospitalSetorHospital');
    await queryRunner.dropForeignKey('hospital_setor', 'HospitalSetorSetor');
    await queryRunner.dropTable('hospital_setor');
  }
}
