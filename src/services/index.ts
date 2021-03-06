import { Application } from '../declarations';
import users from './users/users.service';
import funcionario from './funcionario/funcionario.service';
import hospede from './hospede/hospede.service';
import estados from './estados/estados.service';
import categoriaQuarto from './categoria-quarto/categoria-quarto.service';
import quarto from './quarto/quarto.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(funcionario);
  app.configure(hospede);
  app.configure(estados);
  app.configure(categoriaQuarto);
  app.configure(quarto);
}
