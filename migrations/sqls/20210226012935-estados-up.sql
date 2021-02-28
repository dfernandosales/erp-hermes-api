CREATE TABLE  public.estados (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,

  name TEXT NOT NULL
);

INSERT INTO public.estados (name) VALUES ('Acre');
INSERT INTO public.estados (name) VALUES ('Alagoas');
INSERT INTO public.estados (name) VALUES ('Amapá');
INSERT INTO public.estados (name) VALUES ('Amazonas');
INSERT INTO public.estados (name) VALUES ('Bahia');
INSERT INTO public.estados (name) VALUES ('Ceará');
INSERT INTO public.estados (name) VALUES ('Espírito Santo');
INSERT INTO public.estados (name) VALUES ('Distrito Federal');
INSERT INTO public.estados (name) VALUES ('Goiás');
INSERT INTO public.estados (name) VALUES ('Maranhão');
INSERT INTO public.estados (name) VALUES ('Mato Grosso');
INSERT INTO public.estados (name) VALUES ('Mato Grosso do Sul');
INSERT INTO public.estados (name) VALUES ('Minas Gerais');
INSERT INTO public.estados (name) VALUES ('Paraná');
INSERT INTO public.estados (name) VALUES ('Paraíba');
INSERT INTO public.estados (name) VALUES ('Pará');
INSERT INTO public.estados (name) VALUES ('Pernambuco');
INSERT INTO public.estados (name) VALUES ('Piauí');
INSERT INTO public.estados (name) VALUES ('Rio Grande do Sul');
INSERT INTO public.estados (name) VALUES ('Rio Grande do Norte');
INSERT INTO public.estados (name) VALUES ('Rio de Janeiro');
INSERT INTO public.estados (name) VALUES ('Rondônia');
INSERT INTO public.estados (name) VALUES ('Roraima');
INSERT INTO public.estados (name) VALUES ('Santa Catarina');
INSERT INTO public.estados (name) VALUES ('Sergipe');
INSERT INTO public.estados (name) VALUES ('São Paulo');
INSERT INTO public.estados (name) VALUES ('Tocantins');
