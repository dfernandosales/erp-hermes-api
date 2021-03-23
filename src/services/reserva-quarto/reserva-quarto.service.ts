// Initializes the `reserva-quarto` service on path `/reserva-quarto`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ReservaQuarto } from './reserva-quarto.class';
import createModel from '../../models/reserva-quarto.model';
import hooks from './reserva-quarto.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'reserva-quarto': ReservaQuarto & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reserva-quarto', new ReservaQuarto(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reserva-quarto');

  service.hooks(hooks);
}
