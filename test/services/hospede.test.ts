import assert from 'assert';
import app from '../../src/app';
import { HospedeBuilder, HospedeClass } from '../../src/models/builder';
import { EstadoCivil, Genero } from '../../src/models/enum/usuario.enum';
import itemQuartoHooks from '../../src/services/item-quarto/item-quarto.hooks';

describe('\'hospede\' service', () => {
  it('registered the service', () => {
    const service = app.service('hospede');

    assert.ok(service, 'Registered the service');
  });
});

describe("Teste de criação de hóspedes", () => {
  it('Campos obrigatórios preenchido', async () =>{
    const obj: HospedeClass = new HospedeBuilder()
      .setNomeCompleto('teste')
      .setEmail("teste@hotmail.com")
      .setCpf("12.123.456-3")
      .setDataNascimento(new Date()) 
      .setSexo(Genero.MASCULINO) 
      .setEstadoCivil(EstadoCivil.CASADO) 
      .setProfissao("Tester")
      .setRua("Rua 01")
      .setBairro("Jardim Dias")
      .setNumEndereco("404")
      .setComplemento("Em frente ao pé de Jambo")
      .setCep("87000500")
      .setCidade("Maringá")
      .setEstado("Paraná")
      .setTelefone("44991144002")
      .build();
    
    await assert((async () => { await app.service('hospede').create(obj) })());
  });
  
  it('Campos obrigatórios incompletos', async () =>{
    const obj: HospedeClass = new HospedeBuilder()
      .setNomeCompleto('teste2')
      .setEmail("teste2@hotmail.com")
      .setCpf("12.000.000-0")
      .setDataNascimento(new Date()) 
      .setSexo(Genero.MASCULINO) 
      .setEstadoCivil(EstadoCivil.CASADO) 
      .setProfissao("Tester")
      //faltando a Rua
      .setBairro("Jardim Dias")
      .setNumEndereco("404")
      .setComplemento("Em frente ao ponto")
      .setCep("87000500")
      .setCidade("Maringá")
      .setEstado("Paraná")
      .setTelefone("44991144002")
      .build();
    
    await assert.rejects((async () => { await app.service('hospede').create(obj) })());
  })

  it('Criação com cpf repetido', async () =>{
    const obj: HospedeClass = new HospedeBuilder()
      .setNomeCompleto('teste3')
      .setEmail("teste3@hotmail.com")
      .setCpf("12.123.456-3")
      .setDataNascimento(new Date()) 
      .setSexo(Genero.FEMININO) 
      .setEstadoCivil(EstadoCivil.CASADO) 
      .setProfissao("Tester")
      .setRua("Rua Cleiton")
      .setBairro("Jardim Oasis")
      .setNumEndereco("404")
      .setComplemento("")
      .setCep("87000500")
      .setCidade("Maringá")
      .setEstado("Paraná")
      .setTelefone("44991144002")
      .build();
    
    await assert.rejects((async () => { await app.service('hospede').create(obj) })());
  })
})