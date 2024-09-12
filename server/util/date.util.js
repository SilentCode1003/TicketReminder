import { format } from 'date-fns'

export const dateFormat = {
  standard: 'yyyy-MM-dd',
  withTime: 'yyyy-MM-dd HH:mm',
  withSeconds: 'yyyy-MM-dd HH:mm:ss',
}

export const getTimestamp = (arg) => {
  if (!arg) {
    throw new Error('No argument provided')
  }

  const now = new Date()
  return format(now, arg)
}