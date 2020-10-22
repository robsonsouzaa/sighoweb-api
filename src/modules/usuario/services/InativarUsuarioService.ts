import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';

import IUsuarioRepository from '../repositories/IUsuarioRepository';

@injectable()
class InativarUsuarioService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository: IUsuarioRepository,
  ) {}

  public async execute(usuario_id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscarPorUuid(usuario_id);

    if (!usuario) {
      throw new AplicacaoError(
        'Olá, usuário não encontrado em nossa base de dados!',
      );
    }

    usuario.ativo = false;

    await this.usuarioRepository.salvar(usuario);

    return usuario;
  }
}

export default InativarUsuarioService;
