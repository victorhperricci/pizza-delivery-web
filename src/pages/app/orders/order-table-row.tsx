import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/orders/approve-order'
import { cancelOrder } from '@/api/orders/cancel-order'
import { deliverOrder } from '@/api/orders/deliver-order'
import { dispatchOrder } from '@/api/orders/dispatch-order'
import { GetOrdersResponse } from '@/api/orders/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'

import { OrderDetails } from './order-details'
import { OrderStatus, OrderStatusProps } from './order-status'

dayjs.extend(relativeTime)
dayjs.locale(ptBr)

interface OrderProps {
  orderId: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

interface OrderTableRowProps {
  order: OrderProps
}

interface ActionsMap {
  [key: string]: {
    callback: (params: { orderId: string }) => Promise<void>
    text: string
    disabled: boolean
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(
    orderId: string,
    status: OrderStatusProps['status'],
  ) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const actionsMap: ActionsMap = {
    pending: {
      callback: approveOrderFn,
      text: 'Aprovar',
      disabled: isApprovingOrder,
    },
    processing: {
      callback: dispatchOrderFn,
      text: 'Em entrega',
      disabled: isDispatchingOrder,
    },
    delivering: {
      callback: deliverOrderFn,
      text: 'Entregue',
      disabled: isDeliveringOrder,
    },
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3 " />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {dayjs(order.createdAt).fromNow()}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>

      <TableCell>
        {actionsMap[order.status] && (
          <Button
            variant="outline"
            size="xs"
            disabled={
              actionsMap[order.status].disabled || !actionsMap[order.status]
            }
            onClick={() => {
              if (actionsMap[order.status]) {
                actionsMap[order.status]?.callback({ orderId: order.orderId })
              }
            }}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {actionsMap[order.status].text || 'Já Entregue'}
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
