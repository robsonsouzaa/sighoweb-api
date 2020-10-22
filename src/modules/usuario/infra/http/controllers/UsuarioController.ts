import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarUsuarioService from '@modules/usuario/services/CriarUsuarioService';

export default class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      data_nascimento,
      cpf,
      email,
      senha,
      telefone,
      funcao,
      numero_conselho,
      conselho_estado_id,
      profissao_id,
      especialidade_id,
      hospital_id,
      setores,
    } = request.body;

    const criarUsuario = container.resolve(CriarUsuarioService);

    const usuario = await criarUsuario.execute({
      nome,
      data_nascimento,
      cpf,
      email,
      senha,
      telefone,
      funcao,
      numero_conselho,
      conselho_estado_id,
      profissao_id,
      especialidade_id,
      hospital_id,
      setores,
    });

    delete usuario.senha;

    return response.json(usuario);
  }
}
