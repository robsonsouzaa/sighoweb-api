import {MigrationInterface, QueryRunner} from "typeorm";

export default class PopulaSetores1603462281520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO setor(nome,descricao,ativo)
          VALUES('Faturamento','O setor de Faturamento tem como principal objetivo faturar as contas hospitalares de seus compradores de serviços.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('SAME','O SAME tem como objetivo guardar, conservar, recuperar, mediar e disseminar informações do Hospital.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('Recursos Humanos','O RH está mobilizado para cumprir seu papel e sua base sustenta-se em valores como a perseverança, o comprometimento com os resultados do seu trabalho e a disposição para o aprendizado permanente.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('Farmácia','Sua função é disponibilizar e racionalizar a utilização dos insumos necessários para o tratamento dos pacientes, gerenciando a qualidade dos medicamentos e materiais médico-hospitalares.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('Enfermagem','Responder tecnicamente pelo Serviço de Enfermagem do hospital junto aos Conselhos Federal e Regional de Enfermagem.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('Centro Cirúrgico','Responsável pela realização das cirurgias eletivas do hospital.',${true});

          INSERT INTO setor(nome,descricao,ativo)
          VALUES('Ambulatório','Presta serviços de saúde voltados para os casos de baixa complexidade e que não ofereçam risco imediato à vida do paciente.',${true});

          `,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM setor;');
    }

}
