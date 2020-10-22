import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarSetorService from '@modules/setor/services/CriarSetorService';
import AtualizarSetorService from '@modules/setor/services/AtualizarSetorService';
import ListarSetoresService from '@modules/setor/services/ListarSetoresService';

export default class SetorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body;

    const criarSetor = container.resolve(CriarSetorService);

    const setor = await criarSetor.execute({
      nome,
      descricao,
    });

    return response.json(setor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { setor_id, nome, descricao, ativo } = request.body;

    const atualizarSetor = container.resolve(AtualizarSetorService);

    const setor = await atualizarSetor.execute({
      setor_id,
      nome,
      descricao,
      ativo,
    });

    return response.json(setor);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { pagina, nome, ativo } = request.query;

    const listarSetores = container.resolve(ListarSetoresService);

    const setores = await listarSetores.execute({
      pagina: Number(pagina),
      nome: String(nome),
      ativo: ativo === 'true',
    });

    return response.json(setores);
  }
}
