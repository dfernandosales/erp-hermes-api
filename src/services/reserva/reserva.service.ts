// Initializes the `reserva` service on path `/reserva`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Reserva } from './reserva.class';
import createModel from '../../models/reserva.model';
import hooks from './reserva.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'reserva': Reserva & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reserva', new Reserva(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reserva');

  service.hooks(hooks);
}
