import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import { QuartoClass, QuartoBuilder } from '../../src/models/builder';
import { QuartoModel } from '../../src/models/quarto.model';

describe('\'quarto\' service', () => {
  it('registered the service', () => {
    const service = app.service('quarto');

    assert.ok(service, 'Registered the service');
  });
});

describe('teste criacao de quarto caminho feliz', () => {
  it('create quarto, categoria-quarto', async () =>{
    const categoriaQuarto = await app.service("categoria-quarto").create({ nome: "Teste Builder", valor: 250 });
    const obj: QuartoClass = new QuartoBuilder()
      .setCategoriaQuartoId(categoriaQuarto.id)
      .setNumero(1)
      .setVacancia(true)
      .build();
    try{
      const created: any = await app.service('quarto').create(obj);
    } catch(error) {
      console.log(error)
    }
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    assert(quartos.total > 0)
  })

  it('o numero do quarto deve ser 1', async () => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    quartos.data[0].numero === 1;
  })

  it('a vacancia deve ser falsa', async()  => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    quartos.data[0].vacancia === false;
  })

  it("deve conseguir mudar a vacancia", async () => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    await app.service('quarto').patch(quartos.data[0].id, { vacancia: true })
    assert(quartos.data[0].vacancia === true)
  })
})