import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AplicacaoError from '@shared/errors/AplicacaoError';
import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';

import IUsuarioRepository from '../repositories/IUsuarioRepository';

interface IRequest {
  nome: string;
  data_nascimento: Date;
  cpf: string;
  email: string;
  senha: string;
  telefone: number;
  funcao: number;
  numero_conselho: string;
  conselho_estado_id: number;
  profissao_id: number;
  especialidade_id: number;
  hospital_id: number;
  setores: string[];
}

@injectable()
class CriarUsuarioService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository: IUsuarioRepository,
  ) {}

  public async execute({
    nome,
    data_nascimento,
    cpf,
    email,
    senha,
    telefone,
    funcao,
    numero_conselho,
    conselho_estado_id,
    profissao_id,
    especialidade_id,
    hospital_id,
    setores,
  }: IRequest): Promise<Usuario> {
    const existeUsuario = await this.usuarioRepository.buscarPorEmail(email);

    if (existeUsuario) {
      throw new AplicacaoError(
        'Olá, já existe um usuário cadastrado com este e-mail!',
      );
    }

    const senhaHash = await hash(senha, 8);

    const hospitalSetoresFormatado = setores.map(setor => ({
      hospital_id,
      setor_id: Number(setor),
    }));

    const usuario = await this.usuarioRepository.criar({
      nome,
      data_nascimento,
      cpf,
      email,
      senha: senhaHash,
      telefone,
      funcao,
      numero_conselho,
      conselho_estado_id,
      profissao_id,
      especialidade_id,
      hospitalSetores: hospitalSetoresFormatado.map(hospital => ({
        hospital_id: hospital.hospital_id,
        setor_id: hospital.setor_id,
      })),
    });

    return usuario;
  }
}

export default CriarUsuarioService;
