import { PopoverClose } from '@radix-ui/react-popover'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps extends React.ComponentProps<'div'> {
  date: DateRange | undefined
  onDateRange: (date: DateRange | undefined) => void
}

export function DateRangePicker({
  onDateRange,
  className,
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y', { locale: ptBR })} -{' '}
                  {format(dateRange.to, 'LLL dd, y', { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y', { locale: ptBR })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={ptBR}
          />

          <div className="flex items-center justify-end gap-3 p-4">
            <PopoverClose asChild>
              <Button
                variant="ghost"
                onClick={() => onDateRange(undefined)}
                className="w-fit"
              >
                Limpar
              </Button>
            </PopoverClose>

            <PopoverClose asChild>
              <Button
                variant="default"
                onClick={() =>
                  onDateRange({
                    from: dateRange?.from,
                    to: dateRange?.to || dateRange?.from,
                  })
                }
                className="w-fit"
              >
                Enviar
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
