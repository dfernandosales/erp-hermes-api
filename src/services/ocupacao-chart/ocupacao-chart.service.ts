// Initializes the `ocupacao-chart` service on path `/ocupacao-chart`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { OcupacaoChart } from './ocupacao-chart.class';
import hooks from './ocupacao-chart.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'ocupacao-chart': OcupacaoChart & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ocupacao-chart', new OcupacaoChart(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ocupacao-chart');

  service.hooks(hooks);
}
