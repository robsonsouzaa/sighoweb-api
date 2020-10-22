import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Hospital from '../infra/typeorm/entities/Hospital';

import IHospitalRepository from '../repositories/IHospitalRepository';

@injectable()
class ListarHospitaisAtivosService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute(): Promise<Hospital[]> {
    const hospitais = await this.hospitalRepository.listarAtivos();

    if (hospitais.length === 0) {
      throw new AplicacaoError('Olá, nenhum registro encontrado');
    }

    return hospitais;
  }
}

export default ListarHospitaisAtivosService;
