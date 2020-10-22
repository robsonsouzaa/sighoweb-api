import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InativarHospitalService from '@modules/hospital/services/InativarHospitalService';

export default class InativarHospitalController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { hospital_id } = request.params;

    const inativarHospital = container.resolve(InativarHospitalService);

    await inativarHospital.execute(hospital_id);

    return response
      .status(200)
      .json({ message: { '': ['Registro excluído com sucesso!'] } });
  }
}
