import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';
import ICriarUsuarioDTO from '../dtos/ICriarUsuarioDTO';

export default interface IUsuarioRepository {
  buscarPorId(user_id: number): Promise<Usuario | undefined>;
  buscarPorUuid(user_id: string): Promise<Usuario | undefined>;
  buscarPorEmail(email: string): Promise<Usuario | undefined>;
  criar(data: ICriarUsuarioDTO): Promise<Usuario>;
  salvar(usuario: Usuario): Promise<Usuario>;
}
