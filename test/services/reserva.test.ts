import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import moment from "moment-timezone";
import { ReservaBuilder, ReservaClass } from '../../src/models/builder';
import { StatusReserva } from '../../src/models/enum/reservaEnum';
import { ReservaModel } from '../../src/models/reserva.model';


describe('\'reserva\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva');
    assert.ok(service, 'Registered the service');
  });

});

describe("teste de criacao de reserva caminho feliz ", () => {

  it('create categoria-quarto, quarto, reserva-quarto e reserva', async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setDataFimReserva(moment().add('3', 'days').tz("America/Sao_Paulo").startOf("day").toDate())
      .setStatus(StatusReserva.ABERTA)
      .build();
      try {
        const categoriaQuarto = await app.service("categoria-quarto").create({ nome: "Teste Builder1", valor: 100 });
        const quarto = await app.service("quarto").create({ categoriaQuartoId: categoriaQuarto.id, numero: '10' });
        const created = await app.service('reserva').create(obj);
        await app.service('reserva-quarto').create({ reservaId: created.id, quartoId: quarto.id });
      } catch (error) {
      }

    const reserva = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    assert(reserva.total > 0);
  });

  it("verifica se possui quarto vinculado a essa reserva", async () => {
    const reservaQuarto = (await app.service('reserva-quarto').find()) as Paginated<any>;
    assert(reservaQuarto.total > 0)
  })

  it("erro ao tentar criar reserva com data de saida menor que data de entrada", async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setDataFimReserva(moment().subtract('3', 'days').tz("America/Sao_Paulo").startOf("day").toDate())
      .build();
    await assert.rejects((async () => { await app.service('reserva').create(obj) })());
  })
})

