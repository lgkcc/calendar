import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/eventSlice'
import dateReducer from './slices/dateSlice'

export const store = configureStore({
  reducer: {
    event: eventReducer,
    date: dateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
