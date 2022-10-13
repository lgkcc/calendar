import { createSlice } from '@reduxjs/toolkit'
import { getEventFromLocalStorage } from '../../utils'
import moment from 'moment/moment'
import { TDateFormat } from '../../models/Date'

export type TEvent = {
  date: string
  startTime: string
  endTime: string
  title: string
  id: number
  notificationTime: number | null
}

interface IState {
  events: TEvent[]
  notificationEvent: TEvent[]
}

const initialState: IState = {
  events: getEventFromLocalStorage(),
  notificationEvent: getEventFromLocalStorage().filter(
    (event) => event.date === moment().format(TDateFormat.DayMonthYear)
  )
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const event = state.events.find((event) => event.id === action.payload.id)
      if (event) {
        event.title = action.payload.title
        event.startTime = action.payload.startTime
        event.endTime = action.payload.endTime
        event.notificationTime = action.payload.notificationTime
        return
      }
      state.events = [...state.events, action.payload]
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    }
  }
})

export default eventSlice.reducer
export const { addEvent, removeEvent } = eventSlice.actions
