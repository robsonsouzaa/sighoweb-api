import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Hospital from '../infra/typeorm/entities/Hospital';

import IHospitalRepository from '../repositories/IHospitalRepository';

interface IRequest {
  pagina: number;
  nome: string;
  ativo: boolean;
}

interface IResponse {
  hospitais: Hospital[];
  contador: number;
}

@injectable()
class ListarHospitaisService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute({ pagina, nome, ativo }: IRequest): Promise<IResponse> {
    const {
      hospitais,
      contador,
    } = await this.hospitalRepository.filtrarPorNomeStatus({
      pagina,
      nome,
      ativo,
    });

    if (hospitais.length === 0) {
      throw new AplicacaoError('Olá, nenhum registro encontrado');
    }

    return { hospitais, contador };
  }
}

export default ListarHospitaisService;
