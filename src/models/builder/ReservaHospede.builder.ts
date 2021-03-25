export class ReservaHospedeBuilder {
    private reservaId!: number;
    private hospedeId!: number;

    constructor() {
    }

    setReservaId(value: number): ReservaHospedeBuilder {
      this.reservaId = value;
      return this;
    }
    get ReservaId() {
      return this.reservaId;
    }

    setHospedeId(value: number): ReservaHospedeBuilder {
      this.hospedeId = value;
      return this;
    }
    get HospedeId() {
      return this.hospedeId;
    }

    build(): ReservaHospedeClass {
      return new ReservaHospedeClass(this);
    }
}


export class ReservaHospedeClass {
    private reservaId: number;
    private hospedeId: number;


    constructor(builder: ReservaHospedeBuilder) {
      this.reservaId = builder.ReservaId;
      this.hospedeId = builder.HospedeId;
    }

    get HospedeId() {
      return this.hospedeId;
    }
    get ReservaId() {
      return this.reservaId;
    }
}
