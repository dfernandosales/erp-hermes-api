// Initializes the `estados` service on path `/estados`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Estados } from './estados.class';
import createModel from '../../models/estados.model';
import hooks from './estados.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'estados': Estados & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/estados', new Estados(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('estados');

  service.hooks(hooks);
}
