CREATE TABLE  public.cargo (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  nome_cargo TEXT NOT NULL,
  salario_cargo REAL NOT NULL
);

ALTER TABLE public.funcionario ADD CONSTRAINT funcionario_cargo_fkey FOREIGN KEY (cargo_id) REFERENCES cargo(id)