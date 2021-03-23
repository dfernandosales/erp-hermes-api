CREATE TABLE  public.reserva (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  data_inicio_reserva DATE NOT NULL,
  data_fim_reserva DATE NULL,
  valor_reserva INT NULL,
  status TEXT
);