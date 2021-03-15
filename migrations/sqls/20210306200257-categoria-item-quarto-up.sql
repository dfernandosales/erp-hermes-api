CREATE TABLE  public.categoria_item_quarto (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,


  quantidade INT NOT NULL,
  categoria_quarto_id INT4 NOT NULL,
  item_quarto_id INT4 NOT NULL,


  CONSTRAINT item_quarto_id_composicao_fkey FOREIGN KEY(item_quarto_id) REFERENCES item_quarto(id),
  CONSTRAINT categoria_quarto_id_composicao_fkey FOREIGN KEY(categoria_quarto_id) REFERENCES categoria_quarto(id)
);