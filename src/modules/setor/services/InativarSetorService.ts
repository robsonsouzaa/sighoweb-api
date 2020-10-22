import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Setor from '../infra/typeorm/entities/Setor';

import ISetorRepository from '../repositories/ISetorRepository';

@injectable()
class InativarSetorService {
  constructor(
    @inject('SetorRepository')
    private setorRepository: ISetorRepository,
  ) {}

  public async execute(setor_id: string): Promise<Setor> {
    const setor = await this.setorRepository.buscarPorUuid(setor_id);

    if (!setor) {
      throw new AplicacaoError(
        'Olá, setor não encontrado em nossa base de dados!',
      );
    }

    setor.ativo = false;

    await this.setorRepository.salvar(setor);

    return setor;
  }
}

export default InativarSetorService;
