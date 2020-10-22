import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Setor from '../infra/typeorm/entities/Setor';

import ISetorRepository from '../repositories/ISetorRepository';

interface IRequest {
  nome: string;
  descricao: string;
}

@injectable()
class CriarSetorService {
  constructor(
    @inject('SetorRepository')
    private setorRepository: ISetorRepository,
  ) {}

  public async execute({ nome, descricao }: IRequest): Promise<Setor> {
    const existeSetor = await this.setorRepository.buscarPorNome(nome);

    if (existeSetor) {
      throw new AplicacaoError(
        'Olá, já existe um setor cadastrado com este nome!',
      );
    }

    const setor = await this.setorRepository.criar({ nome, descricao });

    return setor;
  }
}

export default CriarSetorService;
