export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, { text: string; color: string }> = {
  pending: {
    text: 'Pendente',
    color: 'bg-slate-400',
  },
  canceled: {
    text: 'Cancelado',
    color: 'bg-red-500',
  },
  processing: {
    text: 'Processando',
    color: 'bg-yellow-500',
  },
  delivering: {
    text: 'Entregando',
    color: 'bg-blue-500',
  },
  delivered: {
    text: 'Entregue',
    color: 'bg-green-500',
  },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].text}
      </span>
    </div>
  )
}
