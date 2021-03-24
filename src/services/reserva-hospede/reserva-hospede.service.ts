// Initializes the `reserva-hospede` service on path `/reserva-hospede`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ReservaHospede } from './reserva-hospede.class';
import createModel from '../../models/reserva-hospede.model';
import hooks from './reserva-hospede.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'reserva-hospede': ReservaHospede & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reserva-hospede', new ReservaHospede(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reserva-hospede');

  service.hooks(hooks);
}
