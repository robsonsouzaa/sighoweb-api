import { Router } from 'express';

import usuarioRouter from '@modules/usuario/infra/http/routes/usuario.routes';
import sessaoRouter from '@modules/usuario/infra/http/routes/sessao.routes';
import setorRouter from '@modules/setor/infra/http/routes/setor.routes';
import hospitalRouter from '@modules/hospital/infra/http/routes/hospital.routes';

const routes = Router();

routes.use('/usuarios', usuarioRouter);
routes.use('/login', sessaoRouter);
routes.use('/setores', setorRouter);
routes.use('/hospitais', hospitalRouter);

export default routes;
