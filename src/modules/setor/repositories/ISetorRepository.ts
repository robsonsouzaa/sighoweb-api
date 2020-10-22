import Setor from '../infra/typeorm/entities/Setor';
import ICriarSetorDTO from '../dtos/ICriarSetorDTO';
import IListarSetoresDTO from '../dtos/IListarSetoresDTO';

interface IResponse {
  setores: Setor[];
  contador: number;
}

export default interface IUsuarioRepository {
  buscarPorId(setor_id: number): Promise<Setor>;
  buscarPorUuid(setor_id: string): Promise<Setor>;
  buscarPorNome(nome: string): Promise<Setor | undefined>;
  filtrarPorNomeStatus(setorDados: IListarSetoresDTO): Promise<IResponse>;
  criar(setorDados: ICriarSetorDTO): Promise<Setor>;
  salvar(setor: Setor): Promise<Setor>;
}
