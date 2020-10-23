import {MigrationInterface, QueryRunner} from "typeorm";

export default class PopulaHospitais1603462447899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO hospital(nome, cep, logradouro, numero, quantidade_leitos,  telefone, ramal, email, ativo)
        VALUES('Hospital Santa Rosa','78040-600', 'R. Adel Maluf',119,100,36188000,5400,'ouvidoria@hospitalsantarosa.com.br', ${true});

        INSERT INTO hospital(nome, cep, logradouro, numero, quantidade_leitos, telefone, ramal, email, ativo)
        VALUES('Hospital São Mateus','78040-500', 'Av. Aclimação',335,150,30512222,5400,'ouvidoria@hospitalsaomateus.com.br', ${true});

        `,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM hospital;');
    }

}
