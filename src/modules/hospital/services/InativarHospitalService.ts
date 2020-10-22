import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Hospital from '@modules/hospital/infra/typeorm/entities/Hospital';

import IHospitalRepository from '../repositories/IHospitalRepository';

@injectable()
class InativarHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute(hospital_id: string): Promise<Hospital> {
    const hospital = await this.hospitalRepository.buscarPorUuid(hospital_id);

    if (!hospital) {
      throw new AplicacaoError(
        'Olá, hospital não encontrado em nossa base de dados!',
      );
    }

    hospital.ativo = false;

    await this.hospitalRepository.salvar(hospital);

    return hospital;
  }
}

export default InativarHospitalService;
