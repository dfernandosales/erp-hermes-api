// Initializes the `hospede` service on path `/hospede`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Hospede } from './hospede.class';
import createModel from '../../models/hospede.model';
import hooks from './hospede.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'hospede': Hospede & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/hospede', new Hospede(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hospede');

  service.hooks(hooks);
}
