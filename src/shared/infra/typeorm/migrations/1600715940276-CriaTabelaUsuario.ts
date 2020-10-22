import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriaTabelaUsuario1600715940276
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'data_nascimento',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
            length: '11',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'senha',
            type: 'varchar',
          },
          {
            name: 'telefone',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'funcao',
            type: 'integer',
          },
          {
            name: 'numero_conselho',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conselho_estado_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'profissao_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'especialidade_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuario');
  }
}
