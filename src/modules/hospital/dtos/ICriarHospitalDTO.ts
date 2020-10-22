export default interface ICriarHospitalDTO {
  nome: string;
  cep: string;
  logradouro: string;
  numero: number;
  quantidade_leitos: number;
  telefone: number;
  ramal: number;
  email: string;
  responsavel_id: number;
  cidade_id: number;
  bairro_id: number;
  setores: Array<{
    setor_id: number;
  }>;
}
