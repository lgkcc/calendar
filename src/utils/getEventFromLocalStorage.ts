import { TEvent } from '../store/slices/eventSlice'

export const getEventFromLocalStorage = (): TEvent[] => {
  const event = localStorage.getItem('events')
  return event ? JSON.parse(event) : []
}
