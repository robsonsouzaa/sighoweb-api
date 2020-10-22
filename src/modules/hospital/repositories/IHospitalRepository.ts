import Hospital from '@modules/hospital/infra/typeorm/entities/Hospital';
import ICriarHospitalDTO from '../dtos/ICriarHospitalDTO';
import IListarHospitaisDTO from '../dtos/IListarHospitaisDTO';

interface IResponse {
  hospitais: Hospital[];
  contador: number;
}

export default interface IHospitalRepository {
  buscarPorId(hospital_id: number): Promise<Hospital | undefined>;
  buscarPorUuid(hospital_id: string): Promise<Hospital | undefined>;
  buscarPorNome(nome: string): Promise<Hospital | undefined>;
  filtrarPorNomeStatus(hospitalDados: IListarHospitaisDTO): Promise<IResponse>;
  listarAtivos(): Promise<Hospital[]>;
  buscarHospitalComSetores(hospital_id: string): Promise<Hospital>;
  criar(data: ICriarHospitalDTO): Promise<Hospital>;
  atualizar(
    hospital: Hospital,
    hospitalDados: ICriarHospitalDTO,
  ): Promise<Hospital>;
}
