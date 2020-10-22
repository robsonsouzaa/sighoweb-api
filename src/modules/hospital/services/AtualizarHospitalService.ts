import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Hospital from '@modules/hospital/infra/typeorm/entities/Hospital';

import IHospitalRepository from '../repositories/IHospitalRepository';

interface IRequest {
  nome: string;
  cep: string;
  logradouro: string;
  numero: number;
  quantidade_leitos: number;
  quantidade_usuarios: number;
  telefone: number;
  ramal: number;
  email: string;
  responsavel_id: number;
  cidade_id: number;
  bairro_id: number;
  setores: string[];
}

@injectable()
class AtualizarHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute(
    hospital_id: string,
    {
      nome,
      cep,
      logradouro,
      numero,
      quantidade_leitos,
      quantidade_usuarios,
      telefone,
      ramal,
      email,
      responsavel_id,
      cidade_id,
      bairro_id,
      setores,
    }: IRequest,
  ): Promise<Hospital> {
    const hospital = await this.hospitalRepository.buscarPorUuid(hospital_id);

    if (!hospital) {
      throw new AplicacaoError('Olá, nenhum registro encontrado!');
    }

    const setoresFormatado = setores.map(setor => ({
      setor_id: Number(setor),
    }));

    // hospital.setores = [];

    const hospitalAtualizado = this.hospitalRepository.atualizar(hospital, {
      nome,
      cep,
      logradouro,
      numero,
      quantidade_leitos,
      quantidade_usuarios,
      telefone,
      ramal,
      email,
      responsavel_id,
      cidade_id,
      bairro_id,
      setores: setoresFormatado,
    });

    return hospitalAtualizado;
  }
}

export default AtualizarHospitalService;
