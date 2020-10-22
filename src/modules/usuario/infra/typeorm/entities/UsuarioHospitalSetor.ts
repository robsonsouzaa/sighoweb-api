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
import Usuario from './Usuario';

@Entity('usuario_hospital_setor')
class UsuarioHospitalSetor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.hospitalSetores)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Hospital, hospital => hospital.usuarios)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospital;

  @Column()
  hospital_id: number;

  @ManyToOne(() => Setor, setor => setor.setoresHospital)
  @JoinColumn({ name: 'setor_id' })
  setor: Setor;

  @Column()
  setor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UsuarioHospitalSetor;
