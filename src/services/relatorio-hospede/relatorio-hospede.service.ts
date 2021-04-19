// Initializes the `relatorio-hospede` service on path `/relatorio-hospede`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RelatorioHospede } from './relatorio-hospede.class';
import hooks from './relatorio-hospede.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'relatorio-hospede': RelatorioHospede & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/relatorio-hospede', new RelatorioHospede(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('relatorio-hospede');

  service.hooks(hooks);
}
