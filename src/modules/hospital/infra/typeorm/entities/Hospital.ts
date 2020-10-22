import { Exclude } from 'class-transformer';

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

import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';
import UsuarioHospitalSetor from '@modules/usuario/infra/typeorm/entities/UsuarioHospitalSetor';
import HospitalSetor from './HospitalSetor';

@Entity('hospital')
class Hospital {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Exclude()
  uuid: string;

  @Column()
  nome: string;

  @Column()
  @Exclude()
  cep: string;

  @Column()
  @Exclude()
  logradouro: string;

  @Column()
  @Exclude()
  numero: number;

  @Column()
  @Exclude()
  quantidade_leitos: number;

  @Column()
  @Exclude()
  telefone: number;

  @Column()
  @Exclude()
  ramal: number;

  @Column()
  @Exclude()
  email: string;

  @OneToMany(
    () => UsuarioHospitalSetor,
    usuarioHospitalSetor => usuarioHospitalSetor.hospital,
    {
      cascade: ['insert'],
    },
  )
  usuarios: UsuarioHospitalSetor[];

  @OneToMany(() => HospitalSetor, hospitalSetor => hospitalSetor.hospital, {
    cascade: ['insert', 'update', 'remove'],
    eager: true,
  })
  @JoinColumn({ name: 'hospital_id' })
  @Exclude()
  setores: HospitalSetor[];


  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column('boolean')
  @Exclude()
  ativo: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Hospital;
