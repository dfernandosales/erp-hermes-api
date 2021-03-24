// Initializes the `categoria-item-quarto` service on path `/categoria-item-quarto`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CategoriaItemQuarto } from './categoria-item-quarto.class';
import createModel from '../../models/categoria-item-quarto.model';
import hooks from './categoria-item-quarto.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'categoria-item-quarto': CategoriaItemQuarto & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/categoria-item-quarto', new CategoriaItemQuarto(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('categoria-item-quarto');

  service.hooks(hooks);
}
