import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/orders/get-orders'
import { Pagination } from '@/components/pagination/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  OrderFiltersSchema,
  OrderTableFilters,
} from './components/order-table-filters'
import { OrderTableRow } from './components/order-table-row'
import { OrderTableSkeleton } from './components/order-table-skeleton'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')?.trim()
  const customerName = searchParams.get('customerName')?.trim()
  const status = searchParams.get('status') as OrderFiltersSchema['status']

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        perPage: 9,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePageChange(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', String(pageIndex + 1))
      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result ? (
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))
                ) : (
                  <OrderTableSkeleton />
                )}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}
