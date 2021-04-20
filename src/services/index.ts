import { Application } from '../declarations';
import users from './users/users.service';
import funcionario from './funcionario/funcionario.service';
import hospede from './hospede/hospede.service';
import estados from './estados/estados.service';
import categoriaQuarto from './categoria-quarto/categoria-quarto.service';
import quarto from './quarto/quarto.service';
import itemQuarto from './item-quarto/item-quarto.service';
import categoriaItemQuarto from './categoria-item-quarto/categoria-item-quarto.service';
import reserva from './reserva/reserva.service';
import reservaQuarto from './reserva-quarto/reserva-quarto.service';
import reservaHospede from './reserva-hospede/reserva-hospede.service';
import ocupacaoChart from './ocupacao-chart/ocupacao-chart.service';
import cargo from './cargo/cargo.service';
import pagamento from './pagamento/pagamento.service';
import folhaRecebimento from './folha-recebimento/folha-recebimento.service';
import relatorioReservas from './relatorio-reserva/relatorio-reserva.service';
import relatorioHospede from './relatorio-hospede/relatorio-hospede.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(funcionario);
  app.configure(hospede);
  app.configure(estados);
  app.configure(categoriaQuarto);
  app.configure(quarto);
  app.configure(itemQuarto);
  app.configure(categoriaItemQuarto);
  app.configure(reserva);
  app.configure(reservaQuarto);
  app.configure(reservaHospede);
  app.configure(ocupacaoChart);
  app.configure(cargo);
  app.configure(pagamento);
  app.configure(folhaRecebimento);
  app.configure(relatorioReservas);
  app.configure(relatorioHospede);
}
