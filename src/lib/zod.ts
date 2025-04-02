import { z } from 'zod'

const AuthSchema = z.object({
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    password: z.string().min(5, { message: 'Senha precisa ter no mínimo 5 caracteres' }),
})

export { AuthSchema }