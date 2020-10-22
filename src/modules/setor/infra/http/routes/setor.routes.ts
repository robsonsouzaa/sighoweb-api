import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import verificarAutenticacao from '@modules/usuario/infra/middlewares/verificarAutenticacao';
import SetorController from '../controllers/SetorController';
import InativarSetorController from '../controllers/InativarSetorController';

const setorRouter = Router();
setorRouter.use(verificarAutenticacao);

const setorController = new SetorController();
const inativarSetorController = new InativarSetorController();

setorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      descricao: Joi.string(),
    },
  }),
  setorController.create,
);

setorRouter.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        setor_id: Joi.number().required(),
        nome: Joi.string().required(),
        descricao: Joi.string(),
        ativo: Joi.boolean().required(),
      },
    },
    { abortEarly: false },
  ),
  setorController.update,
);

setorRouter.get('/', setorController.index);

setorRouter.patch(
  '/:setor_id',
  celebrate({
    [Segments.PARAMS]: {
      setor_id: Joi.string().uuid().required(),
    },
  }),
  inativarSetorController.update,
);

export default setorRouter;
