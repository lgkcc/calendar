import moment from 'moment/moment'
import { TDateFormat } from '../models/Date'
import { notification } from 'antd'

export const notificationCreate = (
  notificationTime: number,
  title: string,
  startTime: string,
  endTime: string
) => {
  const delay =
    new Date(moment(startTime, TDateFormat.HoursMinSec).toDate()).getTime() -
    Date.now() -
    (notificationTime || 0) * 60000
  if (delay > 0) {
    setTimeout(() => {
      notification.open({
        duration: 8,
        message: 'Напоминание',
        description: `У вас запланировано "${title}" с ${startTime} до ${endTime}`
      })
    }, delay)
  }
}
