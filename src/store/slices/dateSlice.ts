import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { TDateFormat } from '../../models/Date'

const initialState = {
  selectedDate: moment().format(TDateFormat.DayMonthYear)
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.selectedDate = action.payload
    }
  }
})

export default dateSlice.reducer
export const { updateDate } = dateSlice.actions
