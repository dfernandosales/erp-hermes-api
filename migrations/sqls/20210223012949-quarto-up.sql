CREATE TABLE  public.quarto (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  

  numero_quarto INT NOT NULL,
  vacancia BOOLEAN NOT NULL,
  categoria_quarto_id INT,
  CONSTRAINT quarto_categoria_quarto_fkey FOREIGN KEY (categoria_quarto_id) REFERENCES categoria_quarto(id)
);