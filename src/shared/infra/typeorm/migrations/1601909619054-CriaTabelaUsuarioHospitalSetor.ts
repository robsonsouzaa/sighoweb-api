import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriaTabelaUsuarioHospitalSetor1601909619054
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario_hospital_setor',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'usuario_id',
            type: 'integer',
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

    await queryRunner.createForeignKeys('usuario_hospital_setor', [
      new TableForeignKey({
        name: 'UsuarioHospitalSetorUsuario',
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'UsuarioHospitalSetorHospital',
        columnNames: ['hospital_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'hospital',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'UsuarioHospitalSetorSetor',
        columnNames: ['setor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'setor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'usuario_hospital_setor',
      'UsuarioHospitalSetorUsuario',
    );
    await queryRunner.dropForeignKey(
      'usuario_hospital_setor',
      'UsuarioHospitalSetorHospital',
    );
    await queryRunner.dropForeignKey(
      'usuario_hospital_setor',
      'UsuarioHospitalSetorSetor',
    );
    await queryRunner.dropTable('usuario_hospital_setor');
  }
}
