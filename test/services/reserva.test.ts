import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import moment from "moment-timezone";
import { ReservaBuilder, ReservaClass, ReservaQuartoBuilder, ReservaQuartoClass } from '../../src/models/builder';
import { StatusReserva } from '../../src/models/enum/reservaEnum';
import { ReservaModel } from '../../src/models/reserva.model';

describe('\'reserva\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva');

    assert.ok(service, 'Registered the service');
  });

  it('create categoria-quarto, quarto, reserva-quarto e reserva', async () => {
    before(async () => {
      try {
        const categoriaQuarto = await app.service("categoria-quarto").create({ nome: "Teste Builder1", valor: 100 });
        const quarto = await app.service("quarto").create({ categoriaQuartoId: categoriaQuarto.id, numero: '10' });
        const obj: ReservaClass = new ReservaBuilder()
          .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
          .setDataFimReserva(moment().add('3', 'days').tz("America/Sao_Paulo").startOf("day").toDate())
          .setStatus(StatusReserva.ABERTA)
          .build();
        const created = await app.service('reserva').create(obj);
        const reservaQuarto: ReservaQuartoClass = new ReservaQuartoBuilder()
          .setReservaId(created.id)
          .setQuartoId(quarto.id)
          .build();
        await app.service('reserva-quarto').create(reservaQuarto);
      } catch (error) {
        console.log(error)
      }
      const reserva = (await app.service('reserva')._find()) as Paginated<ReservaModel>;
      assert(reserva.total > 0)
    });


  });
});
