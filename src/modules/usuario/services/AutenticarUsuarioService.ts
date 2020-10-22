import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';

import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';

import IUsuarioRepository from '../repositories/IUsuarioRepository';

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

@injectable()
class AutenticarUsuarioService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository: IUsuarioRepository,
  ) {}

  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const usuario = await this.usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw new AplicacaoError('Olá, usuário ou senha incorretos.', 401);
    }

    const confirmaSenha = await compare(senha, usuario.senha);

    if (!confirmaSenha) {
      throw new AplicacaoError('Olá, usuário ou senha incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: usuario.id.toString(),
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AutenticarUsuarioService;
