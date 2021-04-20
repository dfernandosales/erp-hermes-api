// Initializes the `relatorio-reservas` service on path `/relatorio-reservas`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RelatorioReservas } from './relatorio-reserva.class';
import hooks from './relatorio-reserva.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'relatorio-reserva': RelatorioReservas & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/relatorio-reserva', new RelatorioReservas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('relatorio-reserva');

  service.hooks(hooks);
}
