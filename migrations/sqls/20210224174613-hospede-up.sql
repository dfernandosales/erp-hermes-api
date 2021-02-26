CREATE TABLE  public.hospede (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  email TEXT UNIQUE NOT NULL,
  nome_completo TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  sexo TEXT NOT NULL,
  estado_civil TEXT NOT NULL,
  profissao TEXT NOT NULL,
  telefone TEXT NOT NULL,
  rua TEXT NOT NULL,
  bairro TEXT NOT NULL,
  numEndereco TEXT NOT NULL,
  complemento TEXT NULL,
  cep TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL
);