declare namespace Express {
  export interface Request {
    usuario: {
      id: number;
    };
  }

  export interface Response {
    setores: Array<{
      id: number;
      nome: string;
    }>;
  }
}
