import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarHospitalService from '@modules/hospital/services/CriarHospitalService';
import AtualizarHospitalService from '@modules/hospital/services/AtualizarHospitalService';
import ListarHospitaisService from '@modules/hospital/services/ListarHospitaisService';

export default class HospitalController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { pagina, nome, ativo } = request.query;

    const listarHospitais = container.resolve(ListarHospitaisService);

    const hospitais = await listarHospitais.execute({
      pagina: Number(pagina),
      nome: String(nome),
      ativo: ativo === 'true',
    });

    return response.json(hospitais);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const criarHospital = container.resolve(CriarHospitalService);

    const hospital = await criarHospital.execute({
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
    });

    return response.json(hospital);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { hospital_id } = request.params;

    const {
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
    } = request.body;

    const atualizarHospital = container.resolve(AtualizarHospitalService);

    const hospital = await atualizarHospital.execute(hospital_id, {
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
    });

    return response.json(hospital);
  }
}
