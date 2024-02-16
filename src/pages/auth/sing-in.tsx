import { Label } from '@radix-ui/react-label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      throw new Error()

      console.log(data)
      toast.success('Enviamos um link de autenticação para o seu e-mail!')
    } catch (err) {
      toast.error(
        'Não foi possível enviar o link de autenticação. Tente novamente.',
      )
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8 ">
        <div className="w-{350px} flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              variant="default"
              className="w-full"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
