import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InativarUsuarioService from '@modules/usuario/services/InativarUsuarioService';

export default class InativarUsuarioController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { usuario_id } = request.params;

    const inativarUsuario = container.resolve(InativarUsuarioService);

    const usuario = await inativarUsuario.execute(usuario_id);

    delete usuario.senha;

    return response
      .status(200)
      .json({ message: { '': ['Registro excluído com sucesso!'] } });
  }
}
