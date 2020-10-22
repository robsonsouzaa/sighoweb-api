import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsuarioController from '../controllers/UsuarioController';
import InativarUsuarioController from '../controllers/InativarUsuarioController';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();
const inativarUsuarioController = new InativarUsuarioController();

usuarioRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        nome: Joi.string().required(),
        data_nascimento: Joi.date(),
        cpf: Joi.string(),
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        telefone: Joi.string(),
        funcao: Joi.number().required(),
        numero_conselho: Joi.string(),
        conselho_estado_id: Joi.number(),
        profissao_id: Joi.number(),
        especialidade_id: Joi.number(),
        hospital_id: Joi.number().required(),
        setores: Joi.array().items(Joi.number()).required(),
      },
    },
    { abortEarly: false },
  ),
  usuarioController.create,
);
usuarioRouter.patch(
  '/:usuario_id',
  celebrate({
    [Segments.PARAMS]: {
      usuario_id: Joi.string().uuid().required(),
    },
  }),
  inativarUsuarioController.update,
);

export default usuarioRouter;
