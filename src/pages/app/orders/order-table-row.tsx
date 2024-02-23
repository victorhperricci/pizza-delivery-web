import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface OrderTableRowProps {
  key: number
}

export function OrderTableRow({ key }: OrderTableRowProps) {
  return (
    <TableRow key={key}>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3 " />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        2134245rwefwes
      </TableCell>

      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">Victor Hugo Alves Perricci</TableCell>

      <TableCell className="font-medium">R$ 1.500,00</TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
