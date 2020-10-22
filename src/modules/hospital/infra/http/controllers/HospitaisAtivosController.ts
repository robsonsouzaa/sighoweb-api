import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListarHospitaisAtivosService from '@modules/hospital/services/ListarHospitaisAtivosService';

export default class HospitaisAtivosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarHospitais = container.resolve(ListarHospitaisAtivosService);

    const hospitais = await listarHospitais.execute();

    return response.json(classToClass(hospitais));
  }
}
