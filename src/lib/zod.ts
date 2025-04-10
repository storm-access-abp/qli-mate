import { z } from 'zod'

const formSchema = z.object({
  nome: z.string().min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  senha: z.string().min(5, { message: "Senha precisa ter no mínimo 5 caracteres" }),
});

export { formSchema }