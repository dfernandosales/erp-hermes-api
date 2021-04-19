import { EstadoCivil, Genero } from "../enum/usuario.enum";

export class HospedeBuilder{
    private nomeCompleto!: string;
    private email!: string;
    private cpf!: string;
    private dataNascimento!: Date;
    private sexo!: Genero;
    private estadoCivil!: EstadoCivil;
    private profissao!: string;
    private rua!: string;
    private bairro!: string;
    private numEndereco!: string;
    private complemento!: string;
    private cep!: string;
    private cidade!: string;
    private estado!: string;
    private telefone!: string;

    constructor(){}

    get NomeCompleto() {
        return this.nomeCompleto
    }

    setNomeCompleto(value: string): HospedeBuilder {
        this.nomeCompleto = value;
        return this;
    }

    get Email() {
        return this.email
    }

    setEmail(value: string): HospedeBuilder {
        this.email = value;
        return this;
    }

    get Cpf() {
        return this.cpf
    }

    setCpf(value: string): HospedeBuilder {
        this.cpf = value;
        return this;
    }

    get DataNascimento() {
        return this.dataNascimento
    }

    setDataNascimento(value: Date): HospedeBuilder {
        this.dataNascimento = value;
        return this;
    }

    get Sexo() {
        return this.sexo
    }

    setSexo(value: Genero): HospedeBuilder {
        this.sexo = value;
        return this;
    }

    get EstadoCivil() {
        return this.estadoCivil
    }

    setEstadoCivil(value: EstadoCivil): HospedeBuilder {
        this.estadoCivil = value;
        return this;
    }

    get Profissao() {
        return this.profissao
    }

    setProfissao(value: string): HospedeBuilder {
        this.profissao = value;
        return this;
    }

    get Rua() {
        return this.rua
    }

    setRua(value: string): HospedeBuilder {
        this.rua = value;
        return this;
    }

    get Bairro() {
        return this.bairro
    }

    setBairro(value: string): HospedeBuilder {
        this.bairro = value;
        return this;
    }

    get NumEndereco() {
        return this.numEndereco
    }

    setNumEndereco(value: string): HospedeBuilder {
        this.numEndereco = value;
        return this;
    }

    get Complemento() {
        return this.complemento
    }

    setComplemento(value: string): HospedeBuilder {
        this.complemento = value;
        return this;
    }

    get Cep() {
        return this.cep
    }

    setCep(value: string): HospedeBuilder {
        this.cep = value;
        return this;
    }

    get Cidade() {
        return this.cidade
    }

    setCidade(value: string): HospedeBuilder {
        this.cidade = value;
        return this;
    }

    get Estado() {
        return this.estado
    }

    setEstado(value: string): HospedeBuilder {
        this.estado = value;
        return this;
    }

    get Telefone() {
        return this.telefone
    }

    setTelefone(value: string): HospedeBuilder {
        this.telefone = value;
        return this;
    }

    build(): HospedeClass {
        return new HospedeClass(this);
      }
}

export class HospedeClass {
    public nomeCompleto!: string;
    public email!: string;
    public cpf!: string;
    public dataNascimento!: Date;
    public sexo!: Genero;
    public estadoCivil!: EstadoCivil;
    public profissao!: string;
    public rua!: string;
    public bairro!: string;
    public numEndereco!: string;
    public complemento!: string;
    public cep!: string;
    public cidade!: string;
    public estado!: string;
    public telefone!: string;

    constructor(builder: HospedeBuilder) {
        this.nomeCompleto = builder.NomeCompleto
        this.email = builder.Email
        this.cpf = builder.Cpf
        this.dataNascimento = builder.DataNascimento
        this.sexo = builder.Sexo
        this.estadoCivil = builder.EstadoCivil
        this.profissao = builder.Profissao
        this.rua = builder.Rua
        this.bairro = builder.Bairro
        this.numEndereco = builder.NumEndereco
        this.complemento = builder.Complemento
        this.cep = builder.Cep
        this.cidade = builder.Cidade
        this.estado = builder.Estado
        this.telefone = builder.Telefone
    }
}