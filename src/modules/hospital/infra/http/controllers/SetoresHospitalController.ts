import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListarSetoresHospitalService from '@modules/hospital/services/ListarSetoresHospitalService';

interface IResponse {
  setores: Array<{
    id: number;
    nome: string;
  }>;
}

export default class SetoresHospitalController {
  public async index(request: Request, response: Response): Promise<IResponse> {
    const { hospital_id } = request.params;

    const setoresHospital = container.resolve(ListarSetoresHospitalService);

    const setores = await setoresHospital.execute(hospital_id);

    return response.json(classToClass(setores));
  }
}
