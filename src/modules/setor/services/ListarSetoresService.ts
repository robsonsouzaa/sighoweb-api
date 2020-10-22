import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Setor from '../infra/typeorm/entities/Setor';

import ISetorRepository from '../repositories/ISetorRepository';

interface IRequest {
  pagina: number;
  nome: string;
  ativo: boolean;
}

interface IResponse {
  setores: Setor[];
  contador: number;
}

@injectable()
class ListarSetoresService {
  constructor(
    @inject('SetorRepository')
    private setorRepository: ISetorRepository,
  ) {}

  public async execute({ pagina, nome, ativo }: IRequest): Promise<IResponse> {
    const {
      setores,
      contador,
    } = await this.setorRepository.filtrarPorNomeStatus({
      pagina,
      nome,
      ativo,
    });

    if (setores.length === 0) {
      throw new AplicacaoError('Olá, nenhum registro encontrado');
    }

    return { setores, contador };
  }
}

export default ListarSetoresService;
