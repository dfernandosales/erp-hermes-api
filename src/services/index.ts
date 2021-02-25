import { Application } from '../declarations';
import users from './users/users.service';
import categoriaQuarto from './categoria-quarto/categoria-quarto.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(categoriaQuarto);
}
