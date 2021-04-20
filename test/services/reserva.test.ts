import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import moment from "moment-timezone";
import { ReservaBuilder, ReservaClass } from '../../src/models/builder';
import { StatusReserva } from '../../src/models/enum/reservaEnum';
import { ReservaModel } from '../../src/models/reserva.model';
import { EstadoCivil, Genero } from '../../src/models/enum/usuario.enum';


describe('\'reserva\' service', () => {
  it('registered the service', () => {
    const service = app.service('reserva');
    assert.ok(service, 'Registered the service');
  });

});

describe("teste de criacao de reserva caminho feliz ", () => {
  it('create categoria-quarto, quarto, reserva-quarto e reserva', async () => {
    try {
      const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setDataFimReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setUserId(1)
      .setStatus(StatusReserva.ABERTA)
      .build();
      const categoriaQuarto = await app.service("categoria-quarto").create({ nome: "Teste Builder1", valor: 100 });
      const quarto = await app.service("quarto").create({ categoriaQuartoId: categoriaQuarto.id, numero: '10' });
      const hospede = await app.service("hospede").create({
        nomeCompleto: 'teste',
        email: 'teste@gmail.com',
        cpf: '422.369.118-07',
        dataNascimento: new Date(),
        sexo: Genero.MASCULINO,
        estadoCivil: EstadoCivil.VIUVO,
        profissao: 'Desenvolvedor de Software',
        telefone: '(44)92341-7610',
        rua: 'Joao Martelosso',
        bairro: 'Maria Rosa',
        numEndereco: '416',
        cep: '87160-000',
        cidade: 'Mandaguacu',
        estado: 'Acre'
      });
      const created: any = await app.service('reserva')._create(obj);
      await app.service('reserva-quarto').create({ reservaId: created.id, quartoId: quarto.id });
      await app.service('reserva-hospede').create({ reservaId: created.id, hospedeId: hospede.id });
    } catch (error) {
    }

    const reserva = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    assert(reserva.total > 0);
  });

  it("deve conseguir realizar checkout do quarto e valor da reserva ser igual 300", async () => {
    const reserva = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    await app.service('reserva').patch(reserva.data[0].id, { checkout: true })
    const reservaNew = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    assert(reservaNew.data[0].valorReserva == 100 && reservaNew.data[0].status == 'FINALIZADA')
  })

  it("verifica se possui quarto vinculado a essa reserva", async () => {
    const reserva = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    const reservaQuarto = (await app.service('reserva-quarto').find({query:{reservaId:reserva.data[0].id}})) as Paginated<any>;
    assert(reservaQuarto.total > 0)
  })

  it("verifica se possui hospede vinculado a essa reserva", async () => {
    const reserva = (await app.service('reserva').find()) as Paginated<ReservaModel>;
    const reservaHospede = (await app.service('reserva-hospede').find({query:{reservaId:reserva.data[0].id}})) as Paginated<any>;
    assert(reservaHospede.total > 0)
  })

  it("erro ao tentar criar reserva com data de saida menor que data de entrada", async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setDataFimReserva(moment().subtract('10', 'days').tz("America/Sao_Paulo").startOf("day").toDate())
      .setUserId(1)
      .build();
    await assert.rejects((async () => { await app.service('reserva').create(obj) })());
  })

  it("erro ao tentar dar checkout em reserva sem quarto", async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setUserId(1)
      .build();
    const created: any = await app.service('reserva')._create(obj);
    await assert.rejects((async () => { await app.service('reserva').patch(created.id, { checkout: true }) })());
  })

  it("erro ao tentar dar checkout em reserva sem hospede ", async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setUserId(1)
      .build();
    const created: any = await app.service('reserva')._create(obj);
    await assert.rejects((async () => { await app.service('reserva').patch(created.id, { checkout: true }) })());
  })

  it("deve criar reverva com data de inicio e fim no mesmo dia", async () => {
    const obj: ReservaClass = new ReservaBuilder()
      .setDataInicioReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setDataFimReserva(moment().tz("America/Sao_Paulo").startOf("day").toDate())
      .setUserId(1)
      .build();
    const created:any = await app.service('reserva')._create(obj);
    const reserva = (await app.service('reserva').find({query:{id:created.id}})) as Paginated<ReservaModel>;
    assert(reserva.total > 0);
  })
})

