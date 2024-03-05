import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

export function formatDateToNow(date: string) {
  dayjs.extend(relativeTime)
  dayjs.locale(ptBr)

  return dayjs(date).fromNow()
}
