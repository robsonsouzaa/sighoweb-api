export default interface ICriarUsuarioDTO {
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
  hospitalSetores: Array<{
    hospital_id: number;
    setor_id: number;
  }>;
}
