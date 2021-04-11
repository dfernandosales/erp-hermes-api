// Initializes the `folha-recebimento` service on path `/folha-recebimento`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FolhaRecebimento } from './folha-recebimento.class';
import hooks from './folha-recebimento.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'folha-recebimento': FolhaRecebimento & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/folha-recebimento', new FolhaRecebimento(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('folha-recebimento');

  service.hooks(hooks);
}
