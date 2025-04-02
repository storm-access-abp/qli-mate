'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import Link from 'next/link'
import { AuthSchema } from '@/lib/zod'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function Login({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(AuthSchema),
    mode: 'onSubmit'
  })

  type RegisterType = z.infer<typeof AuthSchema>

  async function onSubmit(data: RegisterType) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          toast.success('Login realizado com sucesso!')
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        },
        onError: () => {
          toast.error('Erro ao acessar conta.')
          setLoading(false)
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Entre em sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  required
                  {...register('email')}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Senha
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    required
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {(errors.password || errors.email) && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message && (
                      <span>{errors.email.message}</span>
                    )}
                    <br />
                    {errors.password?.message && (
                      <span>{errors.password.message}</span>
                    )}
                  </p>
                )}
              <Button
                disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
             Não tem uma conta?{' '}
              <Link
                href="/register"
                className="underline underline-offset-4"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}