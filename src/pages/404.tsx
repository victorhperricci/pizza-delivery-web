import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link
          to="/"
          className="text-sky-500 duration-300 hover:brightness-75 dark:text-sky-400"
        >
          Dashboard
        </Link>
      </p>
    </div>
  )
}
