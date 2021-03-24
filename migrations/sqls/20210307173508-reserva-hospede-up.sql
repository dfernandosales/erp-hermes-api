CREATE TABLE  public.reserva_hospede (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  reserva_id INT4 NOT NULL,
  hospede_id INT4 NOT NULL,

  CONSTRAINT reserva_id_composicao_fkey FOREIGN KEY(reserva_id) REFERENCES reserva(id),
  CONSTRAINT hospede_id_composicao_fkey FOREIGN KEY(hospede_id) REFERENCES hospede(id)
);