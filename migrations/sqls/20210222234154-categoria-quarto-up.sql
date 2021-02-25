CREATE TABLE  public.categoria_quarto (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  nome_categoria TEXT NOT NULL,
  valor REAL NOT NULL
);