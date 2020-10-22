import { getRepository, Repository, Raw } from 'typeorm';

import IHospitalRepository from '@modules/hospital/repositories/IHospitalRepository';
import ICriarHospitalDTO from '@modules/hospital/dtos/ICriarHospitalDTO';
import IListarHospitaisDTO from '@modules/hospital/dtos/IListarHospitaisDTO';

import retornaRegistrosPaginacao from '@shared/functions/RetornaRegistrosPaginacao';

import Hospital from '../entities/Hospital';

interface IResponse {
  hospitais: Array<Hospital>;
  contador: number;
}

class HospitalRepository implements IHospitalRepository {
  private ormRepository: Repository<Hospital>;

  constructor() {
    this.ormRepository = getRepository(Hospital);
  }

  public async buscarPorId(hospital_id: number): Promise<Hospital | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: {
        id: hospital_id,
        ativo: true,
      },
    });

    return hospital;
  }

  public async buscarPorUuid(
    hospital_id: string,
  ): Promise<Hospital | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: {
        uuid: hospital_id,
        ativo: true,
      },
    });

    return hospital;
  }

  public async buscarPorNome(nome: string): Promise<Hospital | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { nome },
    });

    return hospital;
  }

  public async criar(hospitalDados: ICriarHospitalDTO): Promise<Hospital> {
    const hospital = this.ormRepository.create(hospitalDados);

    await this.ormRepository.save(hospital);

    return hospital;
  }

  public async atualizar(
    hospital: Hospital,
    hospitalDados: ICriarHospitalDTO,
  ): Promise<Hospital> {
    const hospitalAtualizado = this.ormRepository.merge(
      hospital,
      hospitalDados,
    );

    await this.ormRepository.save(hospitalAtualizado);

    return hospitalAtualizado;
  }

  public async filtrarPorNomeStatus({
    pagina,
    nome,
    ativo,
  }: IListarHospitaisDTO): Promise<IResponse> {
    const { intervalo, quantidadeRegistros } = retornaRegistrosPaginacao(
      pagina,
    );

    const [hospitais, contador] = await this.ormRepository.findAndCount({
      where: {
        nome: Raw(alias => `${alias} ILIKE '%${nome}%'`),
        ativo,
      },
      relations: ['setores'],
      order: { nome: 'ASC' },
      skip: intervalo,
      take: quantidadeRegistros,
    });

    return { hospitais, contador };
  }

  public async buscarHospitalComSetores(
    hospital_id: string,
  ): Promise<Hospital> {
    const hospital = await this.ormRepository.findOne({
      where: {
        uuid: hospital_id,
      },
    });

    return hospital;
  }

  public async listarAtivos(): Promise<Hospital[]> {
    const hospitais = await this.ormRepository.find({
      where: {
        ativo: true,
      },
    });

    return hospitais;
  }
}

export default HospitalRepository;
