import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Setor from '@modules/setor/infra/typeorm/entities/Setor';

import IHospitalRepository from '../repositories/IHospitalRepository';

@injectable()
class ListarSetoresHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute(hospital_id: string): Promise<Setor[]> {
    const hospital = await this.hospitalRepository.buscarHospitalComSetores(
      hospital_id,
    );

    if (!hospital) {
      throw new AplicacaoError('Olá, nenhum registro encontrado');
    }

    const setores = hospital.setores.map(setor => setor.setor);

    return setores;
  }
}

export default ListarSetoresHospitalService;
