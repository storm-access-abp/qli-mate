'use client'
import { cn } from '@/lib/utils'
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
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoaderCircle, Eye, EyeOff } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

export function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
  } = useForm()

  async function onSubmit(data: any) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: '',
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          console.log('usuario cadastrado', data)
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        },
        onError: (ctx: any) => {
          setLoading(false)
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha abaixo para registrar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">
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
              <Button
                disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  'Register'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="underline underline-offset-4"
              >
                Acessar conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}