import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { registerRestaurant } from '../../api/register-restaurant'

const signUpForm = z.object({
  restaurantName: z.string().min(1, 'Nome do restaurante é obrigatório'),
  managerName: z.string().min(1, 'Nome do gerente é obrigatório'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\d{11}$/, 'Telefone inválido'),
  email: z.string().min(1, 'E-mail é obrigatório').email({
    message: 'E-mail inválido',
  }),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })
  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
        restaurantName: data.restaurantName,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
        style: {
          backgroundColor: 'var(--color-success)',
          color: 'var(--color-success-contrast)',
        },
      })
    } catch (err) {
      // console.log(err)
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  console.log(errors)

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8 ">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                type="text"
                id="restaurantName"
                {...register('restaurantName')}
              />
              {errors.restaurantName && (
                <p className="text-xs text-rose-600">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                type="text"
                id="managerName"
                {...register('managerName')}
              />
              {errors.managerName && (
                <p className="text-xs text-rose-600">
                  {errors.managerName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input type="email" id="email" {...register('email')} />
              {errors.email && (
                <p className="text-xs text-rose-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input type="tel" id="phone" {...register('phone')} />
              {errors.phone && (
                <p className="text-xs text-rose-600">{errors.phone.message}</p>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              variant="default"
              className="w-full"
            >
              Finalizar cadastro
            </Button>

            <p className="px-4 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-primary underline underline-offset-4">
                termos de uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-primary underline underline-offset-4">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
