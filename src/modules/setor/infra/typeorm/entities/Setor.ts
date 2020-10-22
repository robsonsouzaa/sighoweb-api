import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import HospitalSetor from '@modules/hospital/infra/typeorm/entities/HospitalSetor';
import UsuarioHospitalSetor from '@modules/usuario/infra/typeorm/entities/UsuarioHospitalSetor';

@Entity('setor')
class Setor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Exclude()
  uuid: string;

  @Column()
  nome: string;

  @Column()
  @Exclude()
  descricao: string;

  @OneToMany(() => HospitalSetor, hospitalSetor => hospitalSetor.setor, {
    // cascade: ['insert', 'remove', 'update'],
    // eager: true,
  })
  @JoinColumn({ name: 'setor_id' })
  @Exclude()
  hospitais: HospitalSetor[];

  @OneToMany(
    () => UsuarioHospitalSetor,
    usuarioHospitalSetor => usuarioHospitalSetor.setor,
  )
  @Exclude()
  setoresHospital: UsuarioHospitalSetor[];

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

export default Setor;
