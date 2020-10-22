import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import UsuarioHospitalSetor from './UsuarioHospitalSetor';

@Entity('usuario')
class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  nome: string;

  @Column('timestamp with time zone')
  data_nascimento: Date;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: number;

  @Column()
  numero_conselho: string;

  @Column()
  funcao: number;

  @OneToMany(
    () => UsuarioHospitalSetor,
    usuarioHospitalSetor => usuarioHospitalSetor.usuario,
    {
      cascade: ['insert', 'remove', 'update'],
      eager: true,
    },
  )
  hospitalSetores: UsuarioHospitalSetor[];

  @Column()
  conselho_estado_id: number;

  @Column()
  profissao_id: number;

  @Column()
  especialidade_id: number;

  @Column('boolean')
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usuario;
