export class ReservaQuartoBuilder {
    private reservaId!: number;
    private quartoId!: number;

    constructor() {
    }

    setReservaId(value: number): ReservaQuartoBuilder {
      this.reservaId = value;
      return this;
    }
    get ReservaId():number {
      return this.reservaId;
    }

    setQuartoId(value: number): ReservaQuartoBuilder {
      this.quartoId = value;
      return this;
    }
    get QuartoId():number {
      return this.quartoId;
    }

    build(): ReservaQuartoClass {
      return new ReservaQuartoClass(this);
    }
}


export class ReservaQuartoClass {
    private reservaId: number;
    private quartoId: number;


    constructor(builder: ReservaQuartoBuilder) {
      this.reservaId = builder.ReservaId;
      this.quartoId = builder.QuartoId;
    }

    get QuartoId() {
      return this.quartoId;
    }
    get ReservaId() {
      return this.reservaId;
    }
}
