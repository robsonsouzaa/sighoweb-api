import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AutenticarUsuarioService from '@modules/usuario/services/AutenticarUsuarioService';

export default class SessaoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const autenticacaoUsuario = container.resolve(AutenticarUsuarioService);

    const { usuario, token } = await autenticacaoUsuario.execute({
      email,
      senha,
    });

    delete usuario.senha;

    return response.json({ usuario, token });
  }
}
