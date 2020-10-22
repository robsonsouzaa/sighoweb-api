import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InativarSetorService from '@modules/setor/services/InativarSetorService';

export default class InativarSetorController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { setor_id } = request.params;

    const inativarSetor = container.resolve(InativarSetorService);

    await inativarSetor.execute(setor_id);

    return response
      .status(200)
      .json({ message: { '': ['Registro excluído com sucesso!'] } });
  }
}
