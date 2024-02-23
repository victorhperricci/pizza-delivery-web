import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface MonthRevenueCardProps {}

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-end justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 10.000,00</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+25%</span>{' '}
          maior que o mês anterior
        </p>
      </CardContent>
    </Card>
  )
}
