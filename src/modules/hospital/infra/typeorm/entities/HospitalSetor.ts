import { Exclude } from 'class-transformer';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Hospital from '@modules/hospital/infra/typeorm/entities/Hospital';
import Setor from '@modules/setor/infra/typeorm/entities/Setor';

@Entity('hospital_setor')
class HospitalSetor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Setor, setor => setor.hospitais, { eager: true })
  @JoinColumn({ name: 'setor_id' })
  setor: Setor;

  @Column()
  setor_id: number;

  @ManyToOne(() => Hospital, hospital => hospital.setores)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospital;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default HospitalSetor;
