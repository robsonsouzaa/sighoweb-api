import { getRepository, Repository, Raw } from 'typeorm';

import ISetorRepository from '@modules/setor/repositories/ISetorRepository';
import ICriarSetorDTO from '@modules/setor/dtos/ICriarSetorDTO';
import IListarSetoresDTO from '@modules/setor/dtos/IListarSetoresDTO';

import retornaRegistrosPaginacao from '@shared/functions/RetornaRegistrosPaginacao';

import Setor from '../entities/Setor';

interface IResponse {
  setores: Array<Setor>;
  contador: number;
}

class SetorRepository implements ISetorRepository {
  private ormRepository: Repository<Setor>;

  constructor() {
    this.ormRepository = getRepository(Setor);
  }

  public async criar(setorDados: ICriarSetorDTO): Promise<Setor> {
    const setor = this.ormRepository.create(setorDados);

    await this.ormRepository.save(setor);

    return setor;
  }

  public async salvar(setor: Setor): Promise<Setor> {
    return this.ormRepository.save(setor);
  }

  public async buscarPorId(setor_id: number): Promise<Setor | undefined> {
    const setor = await this.ormRepository.findOne(setor_id);

    return setor;
  }

  public async buscarPorUuid(setor_id: string): Promise<Setor | undefined> {
    const setor = await this.ormRepository.findOne({
      where: {
        uuid: setor_id,
        ativo: true,
      },
    });

    return setor;
  }

  public async buscarPorNome(nome: string): Promise<Setor | undefined> {
    const setor = await this.ormRepository.findOne({
      where: { nome },
    });

    return setor;
  }

  public async filtrarPorNomeStatus({
    pagina,
    nome,
    ativo,
  }: IListarSetoresDTO): Promise<IResponse> {
    const { intervalo, quantidadeRegistros } = retornaRegistrosPaginacao(
      pagina,
    );

    const [setores, contador] = await this.ormRepository.findAndCount({
      where: {
        nome: Raw(alias => `${alias} ILIKE '%${nome}%'`),
        ativo,
      },
      order: { nome: 'ASC' },
      skip: intervalo,
      take: quantidadeRegistros,
    });

    return { setores, contador };
  }
}

export default SetorRepository;
