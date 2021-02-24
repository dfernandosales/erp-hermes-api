// Initializes the `funcionario` service on path `/funcionario`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Funcionario } from './funcionario.class';
import createModel from '../../models/funcionario.model';
import hooks from './funcionario.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'funcionario': Funcionario & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/funcionario', new Funcionario(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('funcionario');

  service.hooks(hooks);
}
