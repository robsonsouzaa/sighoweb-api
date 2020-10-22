import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Setor from '../infra/typeorm/entities/Setor';

import ISetorRepository from '../repositories/ISetorRepository';

interface IRequest {
  setor_id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}

@injectable()
class AtualizarSetorService {
  constructor(
    @inject('SetorRepository')
    private setorRepository: ISetorRepository,
  ) {}

  public async execute({
    setor_id,
    nome,
    descricao,
    ativo,
  }: IRequest): Promise<Setor> {
    const setor = await this.setorRepository.buscarPorId(setor_id);

    if (!setor) {
      throw new AplicacaoError('Olá, nenhum registro encontrado!');
    }

    setor.nome = nome;
    setor.descricao = descricao;
    setor.ativo = ativo;

    return this.setorRepository.salvar(setor);
  }
}

export default AtualizarSetorService;
