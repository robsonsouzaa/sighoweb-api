import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessaoController from '../controllers/SessaoController';

const sessaoRouter = Router();
const sessaoController = new SessaoController();

sessaoRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  sessaoController.create,
);

export default sessaoRouter;
