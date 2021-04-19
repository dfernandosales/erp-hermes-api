ALTER TABLE public.users 
ADD COLUMN funcionario_id INT NULL,
ADD CONSTRAINT users_funcionario_fkey FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);