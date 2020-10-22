import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AplicacaoError from '@shared/errors/AplicacaoError';

interface ITokenModelo {
  iat: number;
  exp: number;
  sub: string;
}

export default function verificarAutenticacao(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AplicacaoError('Token não autorizado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodificado = verify(token, authConfig.jwt.secret);

    const { sub } = decodificado as ITokenModelo;

    request.usuario = { id: Number(sub) };

    return next();
  } catch (err) {
    throw new AplicacaoError('Token inválido', 401);
  }
}
