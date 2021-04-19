/* Replace with your SQL commands */
CREATE TABLE  public.pagamento (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,

  data_pagamento DATE NOT NULL,
  descricao TEXT NULL,
  valor REAL NULL
);