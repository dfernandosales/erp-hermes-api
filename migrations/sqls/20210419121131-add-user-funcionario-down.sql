ALTER TABLE public.users 
DROP COLUMN funcionario_id INT NULL,
DROP CONSTRAINT users_funcionario_fkey FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)