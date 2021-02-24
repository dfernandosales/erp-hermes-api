CREATE TABLE  public.funcionario (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  email TEXT UNIQUE NOT NULL,
  nome_completo TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  nacionalidade TEXT NOT NULL,
  sexo TEXT NOT NULL,
  estado_civil TEXT NOT NULL,
  cargo TEXT NOT NULL,
  endereco TEXT NOT NULL,
  telefone NUMBER NOT NULL,
  turno_trabalho TEXT
);