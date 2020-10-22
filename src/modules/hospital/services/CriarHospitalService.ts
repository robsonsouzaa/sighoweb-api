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
class CriarHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute({
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
  }: IRequest): Promise<Hospital> {
    const existeHospital = await this.hospitalRepository.buscarPorNome(nome);

    if (existeHospital) {
      throw new AplicacaoError(
        'Olá, já existe um hospital cadastrado com este nome!',
      );
    }

    const setoresFormatado = setores.map(setor => ({
      setor_id: Number(setor),
    }));

    const hospital = await this.hospitalRepository.criar({
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

    return hospital;
  }
}

export default CriarHospitalService;
