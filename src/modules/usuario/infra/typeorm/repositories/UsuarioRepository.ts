import { getRepository, Repository } from 'typeorm';

import IUsuarioRepository from '@modules/usuario/repositories/IUsuarioRepository';
import ICriarUsuarioDTO from '@modules/usuario/dtos/ICriarUsuarioDTO';

import Usuario from '../entities/Usuario';

class UsuarioRepository implements IUsuarioRepository {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = getRepository(Usuario);
  }

  public async buscarPorId(usuario_id: number): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne(usuario_id);

    return usuario;
  }

  public async buscarPorUuid(usuario_id: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne({
      where: {
        uuid: usuario_id,
        ativo: true,
      },
    });

    return usuario;
  }

  public async buscarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne({
      where: { email },
    });

    return usuario;
  }

  public async criar(usuarioDados: ICriarUsuarioDTO): Promise<Usuario> {
    const usuario = this.ormRepository.create(usuarioDados);

    await this.ormRepository.save(usuario);

    return usuario;
  }

  public async salvar(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }
}

export default UsuarioRepository;
