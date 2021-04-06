export class ReservaBuilder {
    private dataInicioReserva!: Date;
    private dataFimReserva!: Date;
    private valorReserva!: number;
    private status!: string;

    constructor() {
    }

    get DataInicioReserva() {
      return this.dataInicioReserva;
    }

    setDataInicioReserva(value: Date) {
      this.dataInicioReserva = value;
      return this;
    }

    setStatus(value: string) {
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
    private id!: Number;
    private dataInicioReserva: Date;
    private dataFimReserva: Date;
    private valorReserva: number;
    private status: string;

    constructor(builder: ReservaBuilder) {
      this.dataInicioReserva = builder.DataInicioReserva;
      this.dataFimReserva = builder.DataFimReserva;
      this.valorReserva = builder.ValorReserva;
      this.status = builder.Status;
    }

    get DataInicioReserva() {
      return this.dataInicioReserva;
    }
    get Id() {
      return this.id;
    }
    get Status() {
      return this.status;
    }
    get ValorReserva() {
      return this.valorReserva;
    }
    get DataFimReserva() {
      return this.dataFimReserva;
    }
}
