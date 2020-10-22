import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';

import AplicacaoError from '@shared/errors/AplicacaoError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AplicacaoError) {
      return response
        .status(err.codigoStatus)
        .json({ errors: { '': [err.mensagem] } });
    }

    console.log(err);

    return response
      .status(500)
      .json({ errors: { '': ['Erro interno do servidor'] } });
  },
);

app.listen(3333, () => {
  console.log('🚀 Servidor rodando na porta 3333');
});
