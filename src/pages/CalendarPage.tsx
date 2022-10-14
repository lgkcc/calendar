import React from 'react'
import moment, { Moment } from 'moment'
import { useNavigate } from 'react-router-dom'
import { Badge, Calendar } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { updateDate } from '../store/slices/dateSlice'
import { TDateFormat } from '../models/Date'
import { EditFilled } from '@ant-design/icons'
import { Helmet } from 'react-helmet'

const CalendarPage = () => {
  const { events } = useAppSelector((state) => state.event)
  const { selectedDate } = useAppSelector((state) => state.date)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const changePage = (date: string) => navigate(`/${date}`)
  const onSelect = (value: Moment) =>
    dispatch(updateDate(value.format(TDateFormat.DayMonthYear)))
  const defaultValue = moment(selectedDate, TDateFormat.DayMonthYear)

  const dateCellRender = (value: Moment) => {
    const formatDate = value.format(TDateFormat.DayMonthYear)
    const isCurrent = value.format(TDateFormat.DayMonthYear) === selectedDate
    const dayEvents = events.filter((ev) => ev.date === formatDate)

    return (
      <>
        <Helmet>
          <title>Календарь</title>
        </Helmet>
        {isCurrent && (
          <EditFilled
            className="editCalendarCell"
            onClick={() => changePage(value.format(TDateFormat.DayMonthYear))}
          />
        )}
        <ul className="events">
          {dayEvents.map((item) => (
            <li key={item.id}>
              <Badge status="success" text={item.title} />
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      defaultValue={defaultValue}
    />
  )
}

export default CalendarPage
