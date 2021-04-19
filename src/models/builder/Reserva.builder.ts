export class ReservaBuilder {
    public dataInicioReserva!: Date;
    public dataFimReserva!: Date;
    public valorReserva!: number;
    public status!: string;
    public userId!: number;

    constructor() {
    }

    get UserId() {
      return this.userId;
    }

    setUserId(value: number): ReservaBuilder {
      this.userId = value;
      return this;
    }

    get DataInicioReserva() {
      return this.dataInicioReserva;
    }

    setDataInicioReserva(value: Date): ReservaBuilder {
      this.dataInicioReserva = value;
      return this;
    }

    setStatus(value: string): ReservaBuilder {
      this.status = value;
      return this;
    }

    get Status() {
      return this.status;
    }

    setValorReserva(value: number): ReservaBuilder {
      this.valorReserva = value;
      return this;
    }
    get ValorReserva() {
      return this.valorReserva;
    }

    setDataFimReserva(value: Date): ReservaBuilder {
      this.dataFimReserva = value;
      return this;
    }
    get DataFimReserva() {
      return this.dataFimReserva;
    }

    build(): ReservaClass {
      return new ReservaClass(this);
    }
}


export class ReservaClass {
    public id!: Number;
    public dataInicioReserva: Date;
    public dataFimReserva: Date;
    public valorReserva: number;
    public status: string;
    public userId: number;

    constructor(builder: ReservaBuilder) {
      this.dataInicioReserva = builder.dataInicioReserva;
      this.dataFimReserva = builder.DataFimReserva;
      this.valorReserva = builder.ValorReserva;
      this.status = builder.Status;
      this.userId = builder.userId;
    }
}
