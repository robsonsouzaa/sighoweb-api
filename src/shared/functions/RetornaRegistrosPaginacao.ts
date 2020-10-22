interface IRequest {
  intervalo: number;
  quantidadeRegistros: number;
}

export default function RetornaRegistroPaginacao(pagina: number): IRequest {
  const quantidadeRegistros = Number(process.env.LIMITE_REGISTROS);

  const intervalo = quantidadeRegistros * pagina - quantidadeRegistros;

  return { intervalo, quantidadeRegistros };
}
