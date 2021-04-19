CREATE TABLE  public.folha_recebimento (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,

  descricao TEXT NOT NULL,
  data_recebimento DATE NOT NULL,
  valor TEXT NOT NULL
);