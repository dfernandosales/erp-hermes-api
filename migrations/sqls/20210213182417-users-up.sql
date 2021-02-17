CREATE TABLE  public.users (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  email TEXT UNIQUE NOT NULL,
  password TEXT NULL,
  role TEXT NOT NULL,
  name TEXT NOT NULL
);

INSERT INTO public.users (email, password, role, name) VALUES ('adm@hermes.com.br', '$2a$10$0sMaVgKVeX6WmEv/7jrBjeGZQA78Bdh6vPg1YM8SHljrj72C0xw3y', 'ADMIN', 'Administrador - Hermes');
INSERT INTO public.users (email, password, role, name) VALUES ('func@hermes.com.br', '$2a$10$0sMaVgKVeX6WmEv/7jrBjeGZQA78Bdh6vPg1YM8SHljrj72C0xw3y', 'FUNC', 'Funncionario - Hermes');
