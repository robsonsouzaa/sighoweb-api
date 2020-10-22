import { container } from 'tsyringe';

import IUsuarioRepository from '@modules/usuario/repositories/IUsuarioRepository';
import UsuarioRepository from '@modules/usuario/infra/typeorm/repositories/UsuarioRepository';

import ISetorRepository from '@modules/setor/repositories/ISetorRepository';
import SetorRepository from '@modules/setor/infra/typeorm/repositories/SetorRepository';

import IHospitalRepository from '@modules/hospital/repositories/IHospitalRepository';
import HospitalRepository from '@modules/hospital/infra/typeorm/repositories/HospitalRepository';

container.registerSingleton<IUsuarioRepository>(
  'UsuarioRepository',
  UsuarioRepository,
);

container.registerSingleton<ISetorRepository>(
  'SetorRepository',
  SetorRepository,
);

container.registerSingleton<IHospitalRepository>(
  'HospitalRepository',
  HospitalRepository,
);
