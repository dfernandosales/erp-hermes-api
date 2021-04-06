// Initializes the `cargo` service on path `/cargo`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Cargo } from './cargo.class';
import createModel from '../../models/cargo.model';
import hooks from './cargo.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'cargo': Cargo & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cargo', new Cargo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cargo');

  service.hooks(hooks);
}
