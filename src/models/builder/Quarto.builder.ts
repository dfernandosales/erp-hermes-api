export class QuartoBuilder {
    public numero!: number;
    public vacancia!: Boolean;
    public categoriaQuartoId!: number;

    constructor() {
    }

    setNumero(value: number): QuartoBuilder {
      this.numero = value;
      return this;
    }

    get Numero() {
      return this.numero;
    }

    setVacancia(value: Boolean): QuartoBuilder {
      this.vacancia = value;
      return this;
    }

    get Vacancia() {
      return this.vacancia;
    }

    setCategoriaQuartoId(value: number): QuartoBuilder {
      this.categoriaQuartoId = value;
      return this;
    }
    get CategoriaQuartoId() {
      return this.categoriaQuartoId;
    }

    build(): QuartoClass {
      return new QuartoClass(this);
    }
}


export class QuartoClass {
    public numero!: number;
    public vacancia: Boolean;
    public categoriaQuartoId: number;

    constructor(builder: QuartoBuilder) {
      this.numero = builder.Numero;
      this.vacancia = builder.Vacancia;
      this.categoriaQuartoId = builder.CategoriaQuartoId;
    }
}
