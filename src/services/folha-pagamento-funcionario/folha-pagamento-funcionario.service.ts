// Initializes the `folha-pagamento-funcionario` service on path `/folha-pagamento-funcionario`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FolhaPagamentoFuncionario } from './folha-pagamento-funcionario.class';
import hooks from './folha-pagamento-funcionario.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'folha-pagamento-funcionario': FolhaPagamentoFuncionario & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/folha-pagamento-funcionario', new FolhaPagamentoFuncionario(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('folha-pagamento-funcionario');

  service.hooks(hooks);
}
