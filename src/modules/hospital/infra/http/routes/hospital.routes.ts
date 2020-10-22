import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import HospitalController from '../controllers/HospitalController';
import InativarHospitalController from '../controllers/InativarHospitalController';
import HospitaisAtivosController from '../controllers/HospitaisAtivosController';
import SetoresHospitalController from '../controllers/SetoresHospitalController';

const hospitalRouter = Router();

const hospitalController = new HospitalController();
const inativarHospitalController = new InativarHospitalController();
const hospitaisAtivosController = new HospitaisAtivosController();
const setoresHospitalController = new SetoresHospitalController();

hospitalRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        nome: Joi.string().required(),
        cep: Joi.string(),
        logradouro: Joi.string(),
        numero: Joi.number(),
        quantidade_leitos: Joi.number(),
        telefone: Joi.number(),
        ramal: Joi.number(),
        email: Joi.string(),
        responsavel_id: Joi.number().required(),
        cidade_id: Joi.number(),
        bairro_id: Joi.number(),
        setores: Joi.array().items(Joi.number()).required(),
      },
    },
    { abortEarly: false },
  ),
  hospitalController.create,
);

hospitalRouter.put(
  '/:hospital_id',
  celebrate(
    {
      [Segments.BODY]: {
        nome: Joi.string().required(),
        cep: Joi.string(),
        logradouro: Joi.string(),
        numero: Joi.number(),
        quantidade_leitos: Joi.number(),
        telefone: Joi.number(),
        ramal: Joi.number(),
        email: Joi.string(),
        responsavel_id: Joi.number().required(),
        cidade_id: Joi.number(),
        bairro_id: Joi.number(),
        setores: Joi.array().items(Joi.number()).required(),
      },
      [Segments.PARAMS]: {
        hospital_id: Joi.string().uuid().required(),
      },
    },
    { abortEarly: false },
  ),
  hospitalController.update,
);

hospitalRouter.get('/', hospitalController.index);

hospitalRouter.get(
  '/:hospital_id/setores',
  celebrate({
    [Segments.PARAMS]: {
      hospital_id: Joi.string().uuid().required(),
    },
  }),
  setoresHospitalController.index,
);


export default hospitalRouter;
