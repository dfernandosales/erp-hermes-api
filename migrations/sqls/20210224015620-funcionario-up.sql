CREATE TABLE  public.funcionario (
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
  telefone TEXT NOT NULL,
  turno_trabalho TEXT NOT NULL,
  rua TEXT NOT NULL,
  bairro TEXT NOT NULL,
  num_endereco TEXT NOT NULL,
  complemento TEXT NULL,
  cep TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  cargo_id INT
);