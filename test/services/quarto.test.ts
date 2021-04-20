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

describe('Testes de criacao de quarto', () => {
  it('Criacao de uma categoria de quarto e de um quarto', async () =>{
    const categoriaQuarto = await app.service("categoria-quarto").create({ nome: "Teste CategoriaQuartoBuilder", valor: 250 });
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
  
  it('O Número do quarto criado deve ser 1', async () => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    assert(quartos.data[0].numero === 1);
  })
  
  it('A vacancia deve ser true', async()  => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    assert(quartos.data[0].vacancia === true);
  })
  
  it('Deve conseguir mudar a vacancia', async () => {
    const quartos = (await app.service('quarto').find()) as Paginated<QuartoModel>;
    const att = await app.service('quarto').patch(quartos.data[0].id, { vacancia: false })
    assert(att.vacancia === false)
  })
  
  it('Tentativa de criar um quarto com um número já existente', async() => {
    const obj: QuartoClass = new QuartoBuilder()
      .setCategoriaQuartoId(1)
      .setNumero(1)
      .setVacancia(true)
      .build();
    await assert.rejects((async () => { await app.service('quarto').create(obj)}))
  })
})