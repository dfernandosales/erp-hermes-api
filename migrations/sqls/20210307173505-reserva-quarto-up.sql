CREATE TABLE  public.reserva_quarto (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  reserva_id INT4 NOT NULL,
  quarto_id INT4 NOT NULL,

  CONSTRAINT reserva_id_composicao_fkey FOREIGN KEY(reserva_id) REFERENCES reserva(id),
  CONSTRAINT quarto_id_composicao_fkey FOREIGN KEY(quarto_id) REFERENCES quarto(id)
);