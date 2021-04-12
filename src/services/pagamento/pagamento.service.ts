// Initializes the `pagamento` service on path `/pagamento`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Pagamento } from './pagamento.class';
import createModel from '../../models/pagamento.model';
import hooks from './pagamento.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'pagamento': Pagamento & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pagamento', new Pagamento(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pagamento');

  service.hooks(hooks);
}